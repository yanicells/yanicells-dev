// =============================================================================
// Spotify Web API Client
// Uses Authorization Code flow with stored refresh token.
// Env vars needed: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
// =============================================================================

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API = "https://api.spotify.com/v1";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
  external_urls: { spotify: string };
  followers: { total: number };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  album_type: string;
  total_tracks: number;
  external_urls: { spotify: string };
  artists: { id: string; name: string; external_urls: { spotify: string } }[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string; external_urls: { spotify: string } }[];
  album: SpotifyAlbum;
  duration_ms: number;
  popularity: number;
  external_urls: { spotify: string };
  preview_url: string | null;
  explicit: boolean;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

interface NowPlayingRaw {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number | null;
  currently_playing_type: string;
}

interface RecommendationsRaw {
  tracks: SpotifyTrack[];
  seeds: { id: string; type: string }[];
}

// Serialized types for client components (minimal payloads)
export interface SerializedTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string | null;
  duration: string;
  url: string;
  explicit: boolean;
}

export interface SerializedArtist {
  id: string;
  name: string;
  image: string | null;
  genres: string[];
  url: string;
}

export interface GenreData {
  genre: string;
  count: number;
  percentage: number;
}

export type TimeRange = "short_term" | "medium_term" | "long_term";

export interface MusicPageData {
  tracks: Record<TimeRange, SerializedTrack[]>;
  artists: Record<TimeRange, SerializedArtist[]>;
  genres: Record<TimeRange, GenreData[]>;
}

export interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  url?: string;
  durationMs?: number;
  progressMs?: number;
}

// -----------------------------------------------------------------------------
// Auth — refresh token flow with in-memory cache
// -----------------------------------------------------------------------------

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify environment variables");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    throw new Error(`Spotify token refresh failed: ${res.status}`);
  }

  const data = await res.json();

  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return data.access_token;
}

// -----------------------------------------------------------------------------
// Generic fetch wrapper
// -----------------------------------------------------------------------------

async function spotifyFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T | null> {
  const token = await getAccessToken();
  const url = new URL(`${SPOTIFY_API}${endpoint}`);

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) return null;
  if (!res.ok) return null;

  return res.json();
}

// -----------------------------------------------------------------------------
// API calls
// -----------------------------------------------------------------------------

export async function getNowPlaying(): Promise<NowPlayingData> {
  const raw = await spotifyFetch<NowPlayingRaw>("/me/player/currently-playing");

  if (!raw || !raw.item || raw.currently_playing_type !== "track") {
    return { isPlaying: false };
  }

  return {
    isPlaying: raw.is_playing,
    title: raw.item.name,
    artist: raw.item.artists.map((a) => a.name).join(", "),
    album: raw.item.album.name,
    albumArt: raw.item.album.images[0]?.url ?? undefined,
    url: raw.item.external_urls.spotify,
    durationMs: raw.item.duration_ms,
    progressMs: raw.progress_ms ?? undefined,
  };
}

export async function getTopTracks(
  timeRange: TimeRange = "medium_term",
  limit = 20,
): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<PaginatedResponse<SpotifyTrack>>(
    "/me/top/tracks",
    { time_range: timeRange, limit: String(limit) },
  );
  return data?.items ?? [];
}

export async function getTopArtists(
  timeRange: TimeRange = "medium_term",
  limit = 20,
): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch<PaginatedResponse<SpotifyArtist>>(
    "/me/top/artists",
    { time_range: timeRange, limit: String(limit) },
  );
  return data?.items ?? [];
}

export async function getRecommendations(
  seedArtists: string[],
  seedTracks: string[],
  limit = 20,
): Promise<SpotifyTrack[]> {
  const params: Record<string, string> = { limit: String(limit) };

  if (seedArtists.length > 0) {
    params.seed_artists = seedArtists.slice(0, 2).join(",");
  }
  if (seedTracks.length > 0) {
    params.seed_tracks = seedTracks.slice(0, 3).join(",");
  }

  const data = await spotifyFetch<RecommendationsRaw>(
    "/recommendations",
    params,
  );
  return data?.tracks ?? [];
}

export async function getRelatedArtists(
  artistId: string,
): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch<{ artists: SpotifyArtist[] }>(
    `/artists/${artistId}/related-artists`,
  );
  return data?.artists ?? [];
}

// -----------------------------------------------------------------------------
// Serialization — minimize data sent to client components
// -----------------------------------------------------------------------------

export function serializeTrack(track: SpotifyTrack): SerializedTrack {
  return {
    id: track.id,
    name: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumArt: track.album.images[0]?.url ?? null,
    duration: formatDuration(track.duration_ms),
    url: track.external_urls.spotify,
    explicit: track.explicit,
  };
}

export function serializeArtist(artist: SpotifyArtist): SerializedArtist {
  return {
    id: artist.id,
    name: artist.name,
    image: artist.images[0]?.url ?? null,
    genres: artist.genres.slice(0, 3),
    url: artist.external_urls.spotify,
  };
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

export function formatDuration(ms: number): string {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export function aggregateGenres(artists: SpotifyArtist[]): GenreData[] {
  const map = new Map<string, number>();

  for (const artist of artists) {
    for (const genre of artist.genres) {
      map.set(genre, (map.get(genre) ?? 0) + 1);
    }
  }

  const total = artists.length || 1;

  return Array.from(map.entries())
    .map(([genre, count]) => ({
      genre,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

// -----------------------------------------------------------------------------
// Parallel data fetcher for all time ranges
// -----------------------------------------------------------------------------

export async function getAllTimeRangeData(): Promise<MusicPageData> {
  const [
    shortTracks,
    mediumTracks,
    longTracks,
    shortArtists,
    mediumArtists,
    longArtists,
  ] = await Promise.all([
    getTopTracks("short_term", 20),
    getTopTracks("medium_term", 20),
    getTopTracks("long_term", 20),
    getTopArtists("short_term", 20),
    getTopArtists("medium_term", 20),
    getTopArtists("long_term", 20),
  ]);

  return {
    tracks: {
      short_term: shortTracks.map(serializeTrack),
      medium_term: mediumTracks.map(serializeTrack),
      long_term: longTracks.map(serializeTrack),
    },
    artists: {
      short_term: shortArtists.map(serializeArtist),
      medium_term: mediumArtists.map(serializeArtist),
      long_term: longArtists.map(serializeArtist),
    },
    genres: {
      short_term: aggregateGenres(shortArtists),
      medium_term: aggregateGenres(mediumArtists),
      long_term: aggregateGenres(longArtists),
    },
  };
}

// Check if Spotify is configured
export function isSpotifyConfigured(): boolean {
  return !!(
    process.env.SPOTIFY_CLIENT_ID &&
    process.env.SPOTIFY_CLIENT_SECRET &&
    process.env.SPOTIFY_REFRESH_TOKEN
  );
}
