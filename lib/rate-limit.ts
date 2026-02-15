/**
 * Edge-compatible in-memory rate limiter using a sliding window.
 *
 * Each IP gets a fixed-size window of timestamps. When a new request arrives,
 * expired timestamps are pruned and the remaining count is checked against the
 * limit. If under the limit the request is allowed and the timestamp recorded.
 *
 * NOTE: This is per-instance. In serverless/edge deployments each isolate has
 * its own map, so this acts as a "best effort" limiter. For production at
 * scale, consider an external store (Upstash Redis, Cloudflare KV, etc.).
 */

interface RateLimitEntry {
  timestamps: number[];
}

const ipMap = new Map<string, RateLimitEntry>();

/** Periodically prune stale IPs to prevent unbounded memory growth. */
const CLEANUP_INTERVAL_MS = 60_000; // 1 minute
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [ip, entry] of ipMap) {
    // Remove entries whose most recent request is older than the window
    if (
      entry.timestamps.length === 0 ||
      entry.timestamps[entry.timestamps.length - 1] < now - windowMs
    ) {
      ipMap.delete(ip);
    }
  }
}

interface RateLimitConfig {
  /** Max requests allowed within the window. Default: 10 */
  limit?: number;
  /** Window duration in milliseconds. Default: 60_000 (1 minute) */
  windowMs?: number;
}

interface RateLimitResult {
  allowed: boolean;
  /** Requests remaining in the current window */
  remaining: number;
  /** Unix ms when the oldest tracked request expires (client can retry after) */
  resetAt: number;
}

/**
 * Check rate limit for a given identifier (typically an IP address).
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = {},
): RateLimitResult {
  const { limit = 10, windowMs = 60_000 } = config;
  const now = Date.now();

  cleanup(windowMs);

  let entry = ipMap.get(identifier);
  if (!entry) {
    entry = { timestamps: [] };
    ipMap.set(identifier, entry);
  }

  // Prune timestamps outside the current window
  entry.timestamps = entry.timestamps.filter((ts) => ts > now - windowMs);

  if (entry.timestamps.length >= limit) {
    const oldestInWindow = entry.timestamps[0];
    return {
      allowed: false,
      remaining: 0,
      resetAt: oldestInWindow + windowMs,
    };
  }

  entry.timestamps.push(now);

  return {
    allowed: true,
    remaining: limit - entry.timestamps.length,
    resetAt: entry.timestamps[0] + windowMs,
  };
}

/**
 * Extract the client IP from the request headers.
 * Works on Vercel Edge, Cloudflare Workers, and behind common proxies.
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
