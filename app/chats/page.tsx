import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageLayout } from "@/components/shared/page-layout";
import { Button } from "@/components/ui/button";
import { chats } from "@/lib/data/chats";

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
      <div className="flex flex-col gap-2 sm:gap-4">
        {/* Header row — matches tech-stack styling */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Chats
            </h1>
            <p className="text-sm text-muted-foreground">
              Curated conversations — FAQs, behind-the-scenes, and random
              thoughts.
            </p>
          </div>
          <Button asChild size="sm" className="shrink-0 rounded-base">
            <Link href="/">
              <Plus className="size-4" />
              New Chat
            </Link>
          </Button>
        </div>

        <hr className="border-border" />

        <div className="divide-y divide-border">
          {chats.map((chat) => {
            const firstQuestion =
              chat.messages.find((m) => m.role === "user")?.content ??
              chat.title;
            const firstResponse =
              chat.messages.find((m) => m.role === "model")?.content ?? "";
            // Strip markdown bold markers for clean preview
            const preview = firstResponse
              .replace(/\*\*/g, "")
              .replace(/\n/g, " ");

            return (
              <Link
                key={chat.slug}
                href={`/chats/${chat.slug}`}
                className="group block py-4"
              >
                <p className="font-medium text-foreground transition-colors group-hover:text-primary">
                  {firstQuestion}
                </p>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  {preview}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
