import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { PhotoHeader } from "@/components/photography/photo-header";
import { PhotoGear } from "@/components/photography/photo-gear";
import { PhotoGallery } from "@/components/photography/photo-gallery";
import { photoCollection } from "@/lib/data/photos";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Explore Yanicells' photography — a collection of moments, perspectives, and light captured through the lens.",
  openGraph: {
    title: "Photography | Yanicells",
    description:
      "Yanicells' photography collection — moments, perspectives, and light.",
    url: "https://yanicells.dev/photography",
  },
  alternates: {
    canonical: "https://yanicells.dev/photography",
  },
};

export default function PhotographyPage() {
  return (
    <PageLayout>
      <div className="flex flex-col gap-6">
        <PhotoHeader />
        <PhotoGear />
        <PhotoGallery photos={photoCollection} />
      </div>
    </PageLayout>
  );
}
