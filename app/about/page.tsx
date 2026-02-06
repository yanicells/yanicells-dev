import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Edrian Miguel E. Capistrano (Yanicells) — my journey into programming from Scratch and HTML in grade school to full-stack web development with Next.js at Ateneo de Manila.",
  openGraph: {
    title: "About | Yanicells",
    description:
      "Learn about Edrian Miguel E. Capistrano (Yanicells) — my journey into programming from grade school to full-stack web development.",
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
