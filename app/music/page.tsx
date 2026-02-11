import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Explore Yanicells' music taste — playlists, favorite artists, and genres that fuel the code.",
  openGraph: {
    title: "Music | Yanicells",
    description: "Yanicells' music taste, playlists, and favorite artists.",
    url: "https://yanicells.dev/music",
  },
  alternates: {
    canonical: "https://yanicells.dev/music",
  },
};

export default function MusicPage() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Music
        </h1>
        <p className="text-sm text-muted-foreground">
          Playlists, favorite artists, and the genres that fuel the code.
        </p>
      </div>
    </PageLayout>
  );
}
