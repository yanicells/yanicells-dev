import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { MusicHeader } from "@/components/music/music-header";
import { NowPlaying } from "@/components/music/now-playing";
import { MusicDashboard } from "@/components/music/music-dashboard";
import { getAllTimeRangeData, isSpotifyConfigured } from "@/lib/spotify";

export const revalidate = 1800; // revalidate every 30 minutes

export const metadata: Metadata = {
  title: "Music",
  description:
    "Explore Yanicells' music taste — top tracks, favorite artists, and genres pulled live from Spotify.",
  openGraph: {
    title: "Music | Yanicells",
    description:
      "Yanicells' top tracks, favorite artists, and genres — live from Spotify.",
    url: "https://yanicells.dev/music",
  },
  alternates: {
    canonical: "https://yanicells.dev/music",
  },
};

export default async function MusicPage() {
  if (!isSpotifyConfigured()) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <svg
            className="size-12 text-muted-foreground/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
          </svg>
          <p className="text-sm text-muted-foreground">
            Spotify integration is not configured yet.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and
            SPOTIFY_REFRESH_TOKEN in your environment.
          </p>
        </div>
      </PageLayout>
    );
  }

  const data = await getAllTimeRangeData();

  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        <MusicHeader />
        <NowPlaying />
        <MusicDashboard data={data} />
      </div>
    </PageLayout>
  );
}
