import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { ChatsGrid } from "@/components/chats/chats-grid";

export const metadata: Metadata = {
  title: "Chats",
  description:
    "Browse through curated conversations — FAQs, behind-the-scenes, and random thoughts from Yanicells.",
  openGraph: {
    title: "Chats | Yanicells",
    description:
      "Browse curated conversations — FAQs, behind-the-scenes, and random thoughts from Yanicells.",
    url: "https://yanicells.dev/chats",
  },
  alternates: {
    canonical: "https://yanicells.dev/chats",
  },
};

export default function ChatsPage() {
  return (
    <PageLayout>
      <ChatsGrid />
    </PageLayout>
  );
}
