/**
 * Personal anime watchlist data.
 * Each entry includes the MAL ID (for fetching poster/details from Jikan API),
 * personal rating, status markers, and optional personal notes.
 *
 * MAL IDs sourced from https://myanimelist.net
 */

export type AnimeStatus =
  | "favorite"
  | "recently-watched"
  | "currently-watching";

export interface AnimeEntry {
  /** MyAnimeList ID — used to fetch poster + metadata from Jikan */
  malId: number;
  /** Display title override (optional, falls back to API title) */
  title: string;
  /** Personal rating out of 10 */
  rating: number;
  /** Optional second rating (e.g. for season 2) */
  rating2?: number;
  /** Personal note / thoughts */
  note?: string;
  /** Personal comment — longer thoughts or review */
  comment?: string;
  /** Status markers */
  status?: AnimeStatus[];
  /** Whether this anime is personally recommended */
  recommended?: boolean;
  /** Date watched (approximate, from discord log) */
  watchedDate: string;
}

export const animeList: AnimeEntry[] = [
  // ── 2021 ───────────────────────────────────────────────
  {
    malId: 20,
    title: "Naruto",
    rating: 9,
    watchedDate: "2021-06-11",
  },
  {
    malId: 1735,
    title: "Naruto: Shippuden",
    rating: 9.6,
    watchedDate: "2021-06-11",
  },
  {
    malId: 1689,
    title: "5 Centimeters per Second",
    rating: 7,
    watchedDate: "2021-06-11",
  },
  {
    malId: 32281,
    title: "Your Name",
    rating: 9,
    status: ["favorite"],
    watchedDate: "2021-06-11",
  },
  {
    malId: 37779,
    title: "The Promised Neverland",
    rating: 8,
    watchedDate: "2021-06-11",
  },
  {
    malId: 16498,
    title: "Attack on Titan",
    rating: 10,
    status: ["favorite"],
    recommended: true,
    comment: "Peak storytelling — every season raises the bar.",
    watchedDate: "2021-06-11",
  },
  {
    malId: 40839,
    title: "Rent-a-Girlfriend",
    rating: 7.8,
    watchedDate: "2021-06-11",
  },
  {
    malId: 34403,
    title: "My First Girlfriend is a Gal",
    rating: 8,
    watchedDate: "2021-06-11",
  },
  {
    malId: 38101,
    title: "The Quintessential Quintuplets",
    rating: 8.8,
    watchedDate: "2021-06-11",
  },
  {
    malId: 37982,
    title: "Domestic Girlfriend",
    rating: 8,
    watchedDate: "2021-06-11",
  },
  {
    malId: 37450,
    title: "Rascal Does Not Dream of Bunny Girl Senpai",
    rating: 10,
    status: ["favorite"],
    recommended: true,
    comment:
      "Way deeper than the title suggests — beautiful character writing.",
    watchedDate: "2021-06-11",
  },
  {
    malId: 23273,
    title: "Your Lie in April",
    rating: 9.4,
    status: ["favorite"],
    watchedDate: "2021-06-11",
  },
  {
    malId: 1535,
    title: "Death Note",
    rating: 8.8,
    watchedDate: "2021-06-11",
  },
  {
    malId: 42897,
    title: "Horimiya",
    rating: 9,
    watchedDate: "2021-06-13",
  },
  {
    malId: 35507,
    title: "Classroom of the Elite",
    rating: 7.8,
    watchedDate: "2021-06-16",
  },
  {
    malId: 35849,
    title: "Darling in the Franxx",
    rating: 8.5,
    watchedDate: "2021-06-17",
  },
  {
    malId: 33352,
    title: "Violet Evergarden",
    rating: 9,
    status: ["favorite"],
    recommended: true,
    comment: "Visually stunning and emotionally devastating. A must-watch.",
    watchedDate: "2021-06-20",
  },
  {
    malId: 32729,
    title: "Orange",
    rating: 9,
    watchedDate: "2021-06-21",
  },
  {
    malId: 22319,
    title: "Tokyo Ghoul",
    rating: 8.3,
    watchedDate: "2021-07-02",
  },
  {
    malId: 40938,
    title: "Higehiro",
    rating: 7.9,
    watchedDate: "2021-07-02",
  },
  {
    malId: 22199,
    title: "Akame ga Kill!",
    rating: 7,
    watchedDate: "2021-07-03",
  },
  {
    malId: 42361,
    title: "Don't Toy with Me, Miss Nagatoro",
    rating: 7.2,
    watchedDate: "2021-07-08",
  },
  {
    malId: 36098,
    title: "I Want to Eat Your Pancreas",
    rating: 9,
    status: ["favorite"],
    watchedDate: "2021-07-08",
  },
  {
    malId: 28851,
    title: "A Silent Voice",
    rating: 9,
    status: ["favorite"],
    watchedDate: "2021-07-09",
  },
  {
    malId: 38000,
    title: "Demon Slayer",
    rating: 9.7,
    status: ["favorite"],
    recommended: true,
    comment: "Ufotable animation is unmatched. The fights are breathtaking.",
    watchedDate: "2021-07-13",
  },
  {
    malId: 37999,
    title: "Kaguya-sama: Love Is War",
    rating: 10,
    status: ["favorite"],
    recommended: true,
    comment: "The best romcom anime — hilarious and genuinely heartwarming.",
    watchedDate: "2021-07-18",
  },
  {
    malId: 40748,
    title: "Jujutsu Kaisen",
    rating: 9.5,
    status: ["favorite"],
    watchedDate: "2021-07-28",
  },
  {
    malId: 20507,
    title: "Noragami",
    rating: 8.3,
    watchedDate: "2021-07-29",
  },
  {
    malId: 42938,
    title: "Fruits Basket: The Final",
    rating: 10,
    status: ["favorite"],
    note: "Complete series",
    watchedDate: "2021-08-10",
  },
  {
    malId: 31043,
    title: "Erased",
    rating: 8.3,
    watchedDate: "2021-08-25",
  },
  {
    malId: 4224,
    title: "Toradora!",
    rating: 7.8,
    watchedDate: "2021-09-07",
  },
  {
    malId: 14227,
    title: "My Little Monster",
    rating: 7.9,
    watchedDate: "2021-09-17",
  },
  {
    malId: 38826,
    title: "Weathering with You",
    rating: 9,
    watchedDate: "2021-10-01",
  },
  {
    malId: 40787,
    title: "Josee, the Tiger and the Fish",
    rating: 9.5,
    status: ["favorite"],
    watchedDate: "2021-10-04",
  },
  {
    malId: 28999,
    title: "Charlotte",
    rating: 8.6,
    watchedDate: "2021-10-11",
  },
  {
    malId: 30015,
    title: "ReLIFE",
    rating: 8,
    watchedDate: "2021-10-22",
  },
  {
    malId: 42249,
    title: "Tokyo Revengers",
    rating: 8.5,
    watchedDate: "2021-11-03",
  },
  {
    malId: 14813,
    title: "My Youth Romantic Comedy Is Wrong, As I Expected",
    rating: 10,
    status: ["favorite"],
    note: "Complete series",
    watchedDate: "2021-11-12",
  },
  {
    malId: 16782,
    title: "The Garden of Words",
    rating: 7.2,
    watchedDate: "2021-11-20",
  },
  {
    malId: 37521,
    title: "Vinland Saga",
    rating: 8.7,
    watchedDate: "2021-11-25",
  },
  {
    malId: 13759,
    title: "Sakurasou no Pet na Kanojo",
    rating: 8.2,
    watchedDate: "2021-12-09",
  },
  {
    malId: 34822,
    title: "Tsuki ga Kirei",
    rating: 8.6,
    watchedDate: "2021-12-22",
  },
  {
    malId: 21995,
    title: "Ao Haru Ride",
    rating: 7.9,
    watchedDate: "2021-12-27",
  },

  // ── 2022 ───────────────────────────────────────────────
  {
    malId: 23277,
    title: "Saekano",
    rating: 8,
    note: "Season 1, 2 and movie",
    watchedDate: "2022-01-22",
  },
  {
    malId: 21647,
    title: "Tamako Love Story",
    rating: 7.5,
    watchedDate: "2022-02-07",
  },
  {
    malId: 35790,
    title: "The Rising of the Shield Hero",
    rating: 8,
    watchedDate: "2022-03-01",
  },
  {
    malId: 41457,
    title: "86: Eighty Six",
    rating: 10,
    status: ["favorite"],
    watchedDate: "2022-03-27",
  },
  {
    malId: 48736,
    title: "My Dress-Up Darling",
    rating: 9,
    watchedDate: "2022-03-29",
  },
  {
    malId: 53065,
    title: "My Dress-Up Darling Season 2",
    rating: 8.2,
    watchedDate: "2026-02-18",
  },
  {
    malId: 39535,
    title: "Mushoku Tensei: Jobless Reincarnation",
    rating: 10,
    status: ["favorite"],
    watchedDate: "2022-03-29",
  },
  {
    malId: 31240,
    title: "Re:Zero",
    rating: 8.7,
    note: "Season 1 and 2",
    watchedDate: "2022-04-20",
  },
  {
    malId: 30276,
    title: "One Punch Man",
    rating: 8.3,
    note: "Season 1 and 2",
    watchedDate: "2022-04-25",
  },
  {
    malId: 41389,
    title: "Tonikawa: Over The Moon For You",
    rating: 8,
    watchedDate: "2022-05-30",
  },
  {
    malId: 34902,
    title: "Tsuredure Children",
    rating: 7.8,
    watchedDate: "2022-05-30",
  },
  {
    malId: 50265,
    title: "Spy x Family",
    rating: 8.5,
    watchedDate: "2022-07-19",
  },
  {
    malId: 38691,
    title: "Dr. Stone",
    rating: 8.5,
    note: "Season 1, 2 and OVA",
    watchedDate: "2022-09-29",
  },
  {
    malId: 48561,
    title: "Jujutsu Kaisen 0",
    rating: 8.5,
    watchedDate: "2022-10-23",
  },
  {
    malId: 10408,
    title: "Hotarubi no Mori e",
    rating: 8,
    watchedDate: "2022-10-23",
  },
  {
    malId: 11061,
    title: "Hunter x Hunter (2011)",
    rating: 9.5,
    status: ["favorite"],
    watchedDate: "2022-11-03",
  },

  // ── 2023 ───────────────────────────────────────────────
  {
    malId: 44511,
    title: "Chainsaw Man",
    rating: 9,
    watchedDate: "2023-01-10",
  },
  {
    malId: 9989,
    title: "Anohana",
    rating: 8.8,
    watchedDate: "2023-01-29",
  },
  {
    malId: 47917,
    title: "Bocchi the Rock!",
    rating: 8.5,
    watchedDate: "2023-01-29",
  },
  {
    malId: 49596,
    title: "Blue Lock",
    rating: 9,
    watchedDate: "2023-04-10",
  },
  {
    malId: 48171,
    title: "Summer Ghost",
    rating: 7.5,
    watchedDate: "2023-05-24",
  },
  {
    malId: 46569,
    title: "Hell's Paradise",
    rating: 8.2,
    watchedDate: "2023-07-12",
  },
  {
    malId: 51552,
    title: "My Happy Marriage",
    rating: 8,
    watchedDate: "2023-12-20",
  },
  {
    malId: 22535,
    title: "Parasyte: The Maxim",
    rating: 8.1,
    watchedDate: "2023-12-20",
  },
  {
    malId: 51179,
    title: "Mushoku Tensei: Jobless Reincarnation Season 2",
    rating: 7.8,
    watchedDate: "2023-12-22",
  },

  // ── 2024 ───────────────────────────────────────────────
  {
    malId: 51009,
    title: "Jujutsu Kaisen Season 2",
    rating: 9.6,
    watchedDate: "2024-01-01",
  },
  {
    malId: 52991,
    title: "Frieren: Beyond Journey's End",
    rating: 9.7,
    status: ["favorite"],
    recommended: true,
    comment: "A masterpiece about time, memory, and what it means to connect.",
    watchedDate: "2024-07-04",
  },
  {
    malId: 55701,
    title: "Demon Slayer: Hashira Training Arc",
    rating: 9,
    watchedDate: "2024-07-06",
  },
  {
    malId: 52299,
    title: "Solo Leveling",
    rating: 9.5,
    rating2: 9.9,
    status: ["recently-watched"],
    watchedDate: "2024-10-11",
  },
  {
    malId: 52588,
    title: "Kaiju No. 8",
    rating: 9.5,
    rating2: 8.5,
    watchedDate: "2024-10-11",
  },

  // ── 2025 ───────────────────────────────────────────────
  {
    malId: 58939,
    title: "Sakamoto Days",
    rating: 8.3,
    status: ["recently-watched"],
    watchedDate: "2025-03-25",
  },
  {
    malId: 57334,
    title: "Dandadan",
    rating: 8.1,
    status: ["recently-watched"],
    watchedDate: "2025-04-03",
  },
  {
    malId: 57181,
    title: "Blue Box",
    rating: 8.2,
    status: ["recently-watched"],
    watchedDate: "2025-04-14",
  },
  {
    malId: 60489,
    title: "Takopi's Original Sin",
    rating: 7.8,
    status: ["recently-watched"],
    watchedDate: "2025-11-10",
  },
  {
    malId: 59845,
    title: "The Fragrant Flower Blooms with Dignity",
    rating: 9.5,
    status: ["recently-watched", "favorite"],
    watchedDate: "2025-12-14",
  },
];

/** Get all anime sorted by rating (highest first) */
export function getAnimeByRating(): AnimeEntry[] {
  return [...animeList].sort((a, b) => b.rating - a.rating);
}

/** Get anime marked with a specific status */
export function getAnimeByStatus(status: AnimeStatus): AnimeEntry[] {
  return animeList.filter((a) => a.status?.includes(status));
}

/** Get count of anime with a perfect 10 rating */
export function getPerfectScoreCount(): number {
  return animeList.filter((a) => a.rating === 10).length;
}

/** Get average rating across all anime */
export function getAverageRating(): number {
  const sum = animeList.reduce((acc, a) => acc + a.rating, 0);
  return Math.round((sum / animeList.length) * 10) / 10;
}
