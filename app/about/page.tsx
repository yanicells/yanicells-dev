import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "learn about edrian miguel e. capistrano (yanicells) — my journey into programming from scratch and html in grade school to full-stack web development with next.js at ateneo de manila.",
  openGraph: {
    title: "About | Yanicells",
    description:
      "learn about edrian miguel e. capistrano (yanicells) — my journey into programming from grade school to full-stack web development.",
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
