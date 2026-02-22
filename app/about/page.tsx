import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-Stack Web Developer & CS Student at Ateneo de Manila University. From Scratch games in grade school to building full-stack apps — my journey into programming.",
  openGraph: {
    title: "About | Yanicells",
    description:
      "Full-Stack Web Developer & CS Student — from Scratch games to full-stack web development.",
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
