/**
 * One-time script to get your Spotify refresh token.
 *
 * Prerequisites:
 *   1. Create an app at https://developer.spotify.com/dashboard
 *   2. Add  http://127.0.0.1:8888/callback  as a Redirect URI in its settings
 *   3. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env or .env.local
 *
 * Run:
 *   npx tsx scripts/get-spotify-token.ts
 *
 * It will open your browser → authorize → print the refresh token.
 * Paste it into .env.local as SPOTIFY_REFRESH_TOKEN.
 */

import { createServer } from "node:http";
import { URL } from "node:url";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// ── Load .env.local or .env ──────────────────────────────────────────────────
function loadEnvFile(filename: string) {
  try {
    const envFile = readFileSync(resolve(process.cwd(), filename), "utf-8");
    for (const line of envFile.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      // Remove surrounding quotes (both single and double)
      val = val.replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
    return true;
  } catch {
    return false;
  }
}

loadEnvFile(".env.local") || loadEnvFile(".env");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

console.log("\n\x1b[36m♫  Spotify Token Helper\x1b[0m\n");
console.log("Environment check:");
console.log(`  CLIENT_ID: ${CLIENT_ID ? "✓ Found" : "✗ Missing"}`);
console.log(`  CLIENT_SECRET: ${CLIENT_SECRET ? "✓ Found" : "✗ Missing"}\n`);

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\x1b[31m✗ Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env or .env.local first.\x1b[0m"
  );
  process.exit(1);
}

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = [
  "user-read-currently-playing",
  "user-top-read",
  "user-read-recently-played",
].join(" ");

// ── Start a tiny HTTP server to catch the callback ───────────────────────────
const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);

  if (!url.pathname.startsWith("/callback")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    console.error(`\n\x1b[31m✗ Authorization denied: ${error}\x1b[0m\n`);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Authorization Failed</title></head>
      <body style="font-family: monospace; background: #1e1e2e; color: #f38ba8; padding: 3rem;">
        <h2>✗ Authorization denied: ${error}</h2>
        <p style="color: #cdd6f4;">Check your Spotify app settings and try again.</p>
      </body>
      </html>
    `);
    server.close();
    process.exit(1);
  }

  if (!code) {
    console.error("\n\x1b[31m✗ No authorization code received.\x1b[0m\n");
    console.error("This usually means:");
    console.error("  1. The redirect URI in Spotify Dashboard doesn't match exactly");
    console.error(`     Expected: \x1b[33m${REDIRECT_URI}\x1b[0m`);
    console.error("  2. You clicked 'Cancel' on the authorization page\n");
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>No Code</title></head>
      <body style="font-family: monospace; background: #1e1e2e; color: #f38ba8; padding: 3rem;">
        <h2>✗ No authorization code received</h2>
        <p style="color: #cdd6f4;">Make sure your Spotify Dashboard redirect URI is:</p>
        <pre style="background: #313244; padding: 1rem; border-radius: 8px;">${REDIRECT_URI}</pre>
      </body>
      </html>
    `);
    return;
  }

  // Exchange code for tokens
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error("\n\x1b[31m✗ Token exchange failed\x1b[0m\n");
    console.error("Response:", JSON.stringify(data, null, 2), "\n");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>Token Exchange Failed</title></head>
      <body style="font-family: monospace; background: #1e1e2e; color: #f38ba8; padding: 3rem;">
        <h2>✗ Token exchange failed</h2>
        <p style="color: #cdd6f4;">Error details:</p>
        <pre style="background: #313244; padding: 1rem; border-radius: 8px; overflow-x: auto;">${JSON.stringify(data, null, 2)}</pre>
      </body>
      </html>
    `);
    server.close();
    process.exit(1);
  }

  const refreshToken: string = data.refresh_token;

  // Print to terminal
  console.log("\n\x1b[32m✓ Success!\x1b[0m\n");
  console.log("Add this to your \x1b[1m.env or .env.local\x1b[0m:\n");
  console.log(`  SPOTIFY_REFRESH_TOKEN=${refreshToken}\n`);

  // Show in browser
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head><title>Spotify Token</title></head>
    <body style="font-family: monospace; background: #1e1e2e; color: #cdd6f4; padding: 3rem;">
      <h2 style="color: #a6e3a1;">✓ Got your refresh token!</h2>
      <p>Add this to <strong>.env or .env.local</strong>:</p>
      <pre style="background: #313244; padding: 1rem; border-radius: 8px; overflow-x: auto; user-select: all;">SPOTIFY_REFRESH_TOKEN=${refreshToken}</pre>
      <p style="color: #a6adc8; margin-top: 2rem;">You can close this tab and stop the script.</p>
    </body>
    </html>
  `);

  // Shut down after a moment
  setTimeout(() => {
    server.close();
    process.exit(0);
  }, 1000);
});

server.listen(PORT, () => {
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", CLIENT_ID);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);

  const url = authUrl.toString();

  console.log("\n\x1b[36mServer started on http://127.0.0.1:8888\x1b[0m\n");
  console.log("\x1b[1mIMPORTANT:\x1b[0m Make sure your Spotify Dashboard has this exact redirect URI:");
  console.log(`  \x1b[33m${REDIRECT_URI}\x1b[0m\n`);
  console.log("Opening browser for authorization...\n");
  console.log(`If it doesn't open, visit:\n  ${url}\n`);

  // Open browser cross-platform
  const open =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "start"
        : "xdg-open";

  import("node:child_process").then(({ exec }) => exec(`${open} "${url}"`));
});
