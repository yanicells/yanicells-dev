import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { PageLayout } from "@/components/shared/page-layout";
import { chats } from "@/lib/data/chats";

export const metadata: Metadata = {
  title: "Chats | Yanicells",
  description:
    "Browse through curated conversations — FAQs, behind-the-scenes, and random thoughts from Yanicells.",
};

export default function ChatsPage() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Chats</h1>
          <p className="mt-1 text-muted-foreground">
            Curated conversations — FAQs, behind-the-scenes, and random
            thoughts.
          </p>
        </div>

        <div className="space-y-1">
          {chats.map((chat) => (
            <Link
              key={chat.slug}
              href={`/chats/${chat.slug}`}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-accent"
            >
              <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{chat.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
