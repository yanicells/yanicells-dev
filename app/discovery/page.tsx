import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";

export const metadata: Metadata = {
  title: "Discovery",
  description:
    "Discover interesting finds, resources, and things Yanicells has stumbled upon — curated links, tools, and inspiration.",
  openGraph: {
    title: "Discovery | Yanicells",
    description:
      "Curated discoveries, resources, and interesting finds from Yanicells.",
    url: "https://yanicells.dev/discovery",
  },
  alternates: {
    canonical: "https://yanicells.dev/discovery",
  },
};

export default function DiscoveryPage() {
  return (
    <PageLayout>
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Discovery
        </h1>
        <p className="text-sm text-muted-foreground">
          Interesting finds, resources, and things I&apos;ve stumbled upon.
        </p>
      </div>
    </PageLayout>
  );
}
