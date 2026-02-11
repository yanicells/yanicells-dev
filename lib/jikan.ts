/**
 * Anime API data provider.
 *
 * Reads from the local cache file (lib/data/anime-cache.json) that is
 * pre-populated by running: `npx tsx scripts/fetch-anime-cache.ts`
 *
 * This avoids runtime API calls to Jikan, eliminating rate limiting issues
 * and ensuring instant page loads in both dev and production.
 */

import animeCache from "@/lib/data/anime-cache.json";

/** Cached anime metadata shape (matches what the fetch script stores) */
export interface AnimeApiData {
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

/** Type for the imported JSON cache */
type AnimeCacheMap = Record<string, AnimeApiData>;

const cache = animeCache as AnimeCacheMap;

/**
 * Look up cached anime data by MAL ID.
 * Returns null if the entry isn't in the cache.
 */
export function getAnimeApiData(malId: number): AnimeApiData | null {
  return cache[malId.toString()] ?? null;
}

/**
 * Get all cached anime data as a plain Record for client components.
 * Filters to only include entries matching the provided MAL IDs.
 */
export function getAnimeApiDataMap(
  malIds: number[],
): Record<number, AnimeApiData> {
  const result: Record<number, AnimeApiData> = {};
  for (const id of malIds) {
    const data = cache[id.toString()];
    if (data) {
      result[id] = data;
    }
  }
  return result;
}
