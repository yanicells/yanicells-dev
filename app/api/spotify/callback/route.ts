import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = `${request.nextUrl.origin}/api/spotify/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      {
        error:
          "Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first",
      },
      { status: 500 },
    );
  }

  if (!code) {
    const scopes = [
      "user-read-currently-playing",
      "user-top-read",
      "user-read-recently-played",
    ].join(" ");

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("scope", scopes);
    authUrl.searchParams.set("redirect_uri", redirectUri);

    return NextResponse.redirect(authUrl.toString());
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: "Token exchange failed", details: data },
      { status: 400 },
    );
  }

  return NextResponse.json({
    message:
      "Copy the refresh_token below and add it to .env.local as SPOTIFY_REFRESH_TOKEN",
    refresh_token: data.refresh_token,
  });
}
