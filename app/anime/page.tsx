import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";

export const metadata: Metadata = {
  title: "Anime",
  description:
    "Explore Yanicells' anime interests — favorite series, recommendations, and thoughts on anime culture.",
  openGraph: {
    title: "Anime | Yanicells",
    description: "Yanicells' anime interests, favorites, and recommendations.",
    url: "https://yanicells.dev/anime",
  },
  alternates: {
    canonical: "https://yanicells.dev/anime",
  },
};

export default function AnimePage() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Anime
        </h1>
        <p className="text-sm text-muted-foreground">
          My favorite anime series, recommendations, and thoughts on the medium.
        </p>
      </div>
    </PageLayout>
  );
}
