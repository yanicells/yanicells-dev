import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { MyStoryContent } from "@/components/my-story/my-story-content";

export const metadata: Metadata = {
  title: "My Story",
  description:
    "The full story of how Yanicells got into programming — from Scratch games in grade school to full-stack web development at Ateneo de Manila.",
  openGraph: {
    title: "My Story | Yanicells",
    description:
      "From Scratch games to full-stack dev — Yanicells' journey into programming.",
    url: "https://yanicells.dev/my-story",
  },
  alternates: {
    canonical: "https://yanicells.dev/my-story",
  },
};

export default function MyStoryPage() {
  return (
    <PageLayout>
      <MyStoryContent />
    </PageLayout>
  );
}
