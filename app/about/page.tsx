import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack web developer specializing in Next.js, TypeScript, and modern web technologies. CS student at Ateneo de Manila University.",
  openGraph: {
    title: "About | Yanicells",
    description:
      "Full-stack web developer specializing in Next.js, TypeScript, and modern web technologies.",
    url: "https://yanicells.dev/about",
  },
  alternates: {
    canonical: "https://yanicells.dev/about",
  },
};

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutContent />
    </PageLayout>
  );
}
