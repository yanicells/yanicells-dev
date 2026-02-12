import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { DiscoveryContent } from "@/components/discovery/discovery-content";

export const metadata: Metadata = {
  title: "Discovery",
  description:
    "Explore Yanicells' world — anime, photography, music, projects, and more. A homepage for everything under Yani's Cells.",
  openGraph: {
    title: "Discovery | Yanicells",
    description:
      "Explore Yanicells' world — anime, photography, music, projects, and more.",
    url: "https://yanicells.dev/discovery",
  },
  alternates: {
    canonical: "https://yanicells.dev/discovery",
  },
};

export default function DiscoveryPage() {
  return (
    <PageLayout>
      <DiscoveryContent />
    </PageLayout>
  );
}
