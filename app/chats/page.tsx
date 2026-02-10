import type { Metadata } from "next";
import Link from "next/link";
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
