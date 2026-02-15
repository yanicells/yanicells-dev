import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/lib/data/system-prompt";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "edge";

// ─── Rate-limit config ────────────────────────────────────────────────
const RATE_LIMIT = 10; // max requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute

// ─── Input validation limits ──────────────────────────────────────────
const MAX_MESSAGES = 30; // max conversation history length
const MAX_MESSAGE_LENGTH = 2_000; // max chars per individual message
const MAX_BODY_SIZE = 100_000; // ~100 KB payload cap

// ─── Types ────────────────────────────────────────────────────────────
interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

/** JSON error response helper */
function jsonError(
  error: string,
  message: string,
  status: number,
  headers?: Record<string, string>,
) {
  return new Response(JSON.stringify({ error, message }), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export async function POST(req: Request) {
  // ── 1. Origin / Referer check ─────────────────────────────────────
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const allowedHosts = [
    "yanicells.dev",
    "www.yanicells.dev",
    "localhost",
    "127.0.0.1",
  ];

  const isAllowedOrigin = (() => {
    try {
      if (origin)
        return allowedHosts.some((h) => new URL(origin).hostname.includes(h));
      if (referer)
        return allowedHosts.some((h) => new URL(referer).hostname.includes(h));
      // Allow requests with no origin/referer (e.g. server-to-server in dev)
      return process.env.NODE_ENV === "development";
    } catch {
      return false;
    }
  })();

  if (!isAllowedOrigin) {
    return jsonError("forbidden", "Request origin not allowed.", 403);
  }

  // ── 2. Rate limiting ──────────────────────────────────────────────
  const clientIp = getClientIp(req);
  const rateResult = checkRateLimit(clientIp, {
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  });

  if (!rateResult.allowed) {
    const retryAfterSec = Math.ceil((rateResult.resetAt - Date.now()) / 1_000);
    return jsonError(
      "rate_limit",
      "Too many requests. Please wait a moment and try again.",
      429,
      {
        "Retry-After": String(Math.max(retryAfterSec, 1)),
        "X-RateLimit-Limit": String(RATE_LIMIT),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(rateResult.resetAt),
      },
    );
  }

  // ── 3. API key check ──────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonError("server_error", "AI service is not configured.", 500);
  }

  // ── 4. Body size guard ────────────────────────────────────────────
  const contentLength = req.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_SIZE) {
    return jsonError("payload_too_large", "Request payload is too large.", 413);
  }

  // ── 5. Parse & validate input ─────────────────────────────────────
  let body: unknown;
  try {
    const rawText = await req.text();
    if (rawText.length > MAX_BODY_SIZE) {
      return jsonError(
        "payload_too_large",
        "Request payload is too large.",
        413,
      );
    }
    body = JSON.parse(rawText);
  } catch {
    return jsonError("bad_request", "Invalid JSON body.", 400);
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("messages" in body) ||
    !Array.isArray((body as { messages: unknown }).messages)
  ) {
    return jsonError(
      "bad_request",
      "Request body must contain a `messages` array.",
      400,
    );
  }

  const messages = (body as { messages: unknown[] }).messages;

  if (messages.length === 0) {
    return jsonError("bad_request", "Messages array cannot be empty.", 400);
  }

  if (messages.length > MAX_MESSAGES) {
    return jsonError(
      "bad_request",
      `Conversation too long. Maximum ${MAX_MESSAGES} messages allowed.`,
      400,
    );
  }

  // Validate each message structure
  for (const msg of messages) {
    if (
      !msg ||
      typeof msg !== "object" ||
      !("role" in msg) ||
      !("parts" in msg)
    ) {
      return jsonError("bad_request", "Invalid message structure.", 400);
    }

    const { role, parts } = msg as { role: unknown; parts: unknown };

    if (role !== "user" && role !== "model") {
      return jsonError(
        "bad_request",
        'Message role must be "user" or "model".',
        400,
      );
    }

    if (!Array.isArray(parts) || parts.length === 0) {
      return jsonError(
        "bad_request",
        "Message parts must be a non-empty array.",
        400,
      );
    }

    for (const part of parts) {
      if (!part || typeof part !== "object" || !("text" in part)) {
        return jsonError(
          "bad_request",
          "Each part must have a `text` field.",
          400,
        );
      }

      const text = (part as { text: unknown }).text;
      if (typeof text !== "string") {
        return jsonError("bad_request", "Part text must be a string.", 400);
      }

      if (text.length > MAX_MESSAGE_LENGTH) {
        return jsonError(
          "bad_request",
          `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters per message.`,
          400,
        );
      }
    }
  }

  const validMessages = messages as ChatMessage[];

  // ── 6. Call Gemini ────────────────────────────────────────────────
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: SYSTEM_PROMPT,
  });

  const chat = model.startChat({
    history: validMessages.slice(0, -1),
  });

  const lastMessage = validMessages[validMessages.length - 1];

  let result;
  try {
    result = await chat.sendMessageStream(lastMessage.parts[0].text);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (
      message.includes("429") ||
      message.toLowerCase().includes("quota") ||
      message.toLowerCase().includes("rate")
    ) {
      return jsonError(
        "rate_limit",
        "The AI has reached its usage limit. Please try again in a minute.",
        429,
      );
    }
    return jsonError(
      "api_error",
      message || "Something went wrong with the AI.",
      500,
    );
  }

  // ── 7. Stream response ────────────────────────────────────────────
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Stream error";
        controller.enqueue(encoder.encode(`\n\n[Error: ${errorMessage}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-RateLimit-Limit": String(RATE_LIMIT),
      "X-RateLimit-Remaining": String(rateResult.remaining),
      "X-RateLimit-Reset": String(rateResult.resetAt),
    },
  });
}
