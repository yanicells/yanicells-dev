import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Explore Yanicells' photography — captures, perspectives, and visual stories through the lens.",
  openGraph: {
    title: "Photography | Yanicells",
    description: "Yanicells' photography captures and visual stories.",
    url: "https://yanicells.dev/photography",
  },
  alternates: {
    canonical: "https://yanicells.dev/photography",
  },
};

export default function PhotographyPage() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Photography
        </h1>
        <p className="text-sm text-muted-foreground">
          Captures, perspectives, and visual stories through the lens.
        </p>
      </div>
    </PageLayout>
  );
}
