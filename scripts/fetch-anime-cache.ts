/**
 * Script to pre-fetch anime data from the Jikan API and cache it locally.
 *
 * Usage: npx tsx scripts/fetch-anime-cache.ts
 *
 * This fetches poster images, metadata, and genres for all anime in the watchlist
 * and saves them to lib/data/anime-cache.json. The main page reads from this cache
 * instead of making live API calls, which avoids rate limiting issues.
 *
 * Run this script whenever you add new anime to the watchlist.
 */

import * as fs from "fs";
import * as path from "path";

// Import the anime list — we need to use a relative path since this runs outside Next.js
const ANIME_DATA_PATH = path.join(__dirname, "../lib/data/anime.ts");
const CACHE_OUTPUT_PATH = path.join(__dirname, "../lib/data/anime-cache.json");

interface JikanAnimeData {
  mal_id: number;
  title: string;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  type: string;
  episodes: number | null;
  score: number | null;
  genres: { name: string }[];
  studios: { name: string }[];
  status: string;
  year: number | null;
}

interface CacheEntry {
  mal_id: number;
  title: string;
  image_url: string;
  large_image_url: string;
  type: string;
  episodes: number | null;
  score: number | null;
  genres: string[];
  studio: string | null;
  year: number | null;
}

async function fetchAnime(malId: number): Promise<JikanAnimeData | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
    if (!res.ok) {
      console.warn(`  ⚠ MAL ID ${malId}: HTTP ${res.status}`);
      return null;
    }
    const json = await res.json();
    return json.data as JikanAnimeData;
  } catch (error) {
    console.warn(`  ✗ MAL ID ${malId}: ${error}`);
    return null;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Read existing cache if it exists
  let existingCache: Record<string, CacheEntry> = {};
  if (fs.existsSync(CACHE_OUTPUT_PATH)) {
    try {
      const raw = fs.readFileSync(CACHE_OUTPUT_PATH, "utf-8");
      existingCache = JSON.parse(raw);
      console.log(
        `📦 Found existing cache with ${Object.keys(existingCache).length} entries`,
      );
    } catch {
      console.log("📦 No valid existing cache found, starting fresh");
    }
  }

  // Read the anime.ts file to extract MAL IDs
  const animeFileContent = fs.readFileSync(ANIME_DATA_PATH, "utf-8");
  const malIdMatches = animeFileContent.matchAll(/malId:\s*(\d+)/g);
  const malIds = [...malIdMatches].map((m) => parseInt(m[1], 10));

  console.log(`\n🎬 Found ${malIds.length} anime entries to fetch\n`);

  // Only fetch entries that aren't already cached
  const uncachedIds = malIds.filter((id) => !existingCache[id.toString()]);

  if (uncachedIds.length === 0) {
    console.log("✅ All entries already cached! Nothing to fetch.\n");
    return;
  }

  console.log(
    `🔄 Fetching ${uncachedIds.length} uncached entries (${malIds.length - uncachedIds.length} already cached)\n`,
  );

  const cache: Record<string, CacheEntry> = { ...existingCache };

  // Fetch one at a time with 1 second delay to respect Jikan rate limits
  // Jikan allows ~3 req/s but we go conservative to avoid 429s
  for (let i = 0; i < uncachedIds.length; i++) {
    const malId = uncachedIds[i];
    const progress = `[${i + 1}/${uncachedIds.length}]`;

    const data = await fetchAnime(malId);

    if (data) {
      cache[malId.toString()] = {
        mal_id: data.mal_id,
        title: data.title,
        image_url: data.images.webp.image_url,
        large_image_url: data.images.webp.large_image_url,
        type: data.type,
        episodes: data.episodes,
        score: data.score,
        genres: data.genres.map((g) => g.name),
        studio: data.studios[0]?.name ?? null,
        year: data.year,
      };
      console.log(`  ${progress} ✓ ${data.title}`);
    } else {
      console.log(`  ${progress} ✗ MAL ID ${malId} (failed)`);
    }

    // Wait between requests (skip after last)
    if (i < uncachedIds.length - 1) {
      await sleep(1000);
    }
  }

  // Write cache to file
  fs.writeFileSync(CACHE_OUTPUT_PATH, JSON.stringify(cache, null, 2), "utf-8");

  const totalCached = Object.keys(cache).length;
  const newlyFetched = uncachedIds.length;
  console.log(
    `\n✅ Cache updated! ${totalCached} total entries (${newlyFetched} newly fetched)`,
  );
  console.log(`📁 Saved to ${CACHE_OUTPUT_PATH}\n`);
}

main().catch(console.error);
