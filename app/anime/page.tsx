import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { AnimeHeader } from "@/components/anime/anime-header";
import { AnimeStats } from "@/components/anime/anime-stats";
import { AnimeList } from "@/components/anime/anime-list";
import { animeList } from "@/lib/data/anime";
import { getAnimeApiDataMap } from "@/lib/jikan";

export const metadata: Metadata = {
  title: "Anime",
  description:
    "Explore Yanicells' anime watchlist — personal ratings, favorites, and thoughts on 70+ anime series and films.",
  openGraph: {
    title: "Anime | Yanicells",
    description:
      "Yanicells' anime watchlist with personal ratings, favorites, and recommendations.",
    url: "https://yanicells.dev/anime",
  },
  alternates: {
    canonical: "https://yanicells.dev/anime",
  },
};

export default function AnimePage() {
  // Read cached anime data (pre-fetched via scripts/fetch-anime-cache.ts)
  const malIds = animeList.map((a) => a.malId);
  const apiDataMap = getAnimeApiDataMap(malIds);

  return (
    <PageLayout>
      <div className="flex flex-col gap-6">
        <AnimeHeader />
        <AnimeStats />
        <AnimeList entries={animeList} apiDataMap={apiDataMap} />
      </div>
    </PageLayout>
  );
}
