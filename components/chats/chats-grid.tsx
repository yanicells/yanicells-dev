"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chats } from "@/lib/data/chats";

export function ChatsGrid() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = useMemo(() => {
    if (searchQuery === "") return chats;
    const q = searchQuery.toLowerCase();
    return chats.filter((chat) => {
      const firstQuestion =
        chat.messages.find((m) => m.role === "user")?.content ?? chat.title;
      const firstResponse =
        chat.messages.find((m) => m.role === "model")?.content ?? "";
      return (
        chat.title.toLowerCase().includes(q) ||
        firstQuestion.toLowerCase().includes(q) ||
        firstResponse.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      {/* Header — matches tech-stack styling */}
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

      {/* Sticky search — matches tech-stack pattern */}
      <div className="sticky top-14 z-40 -mx-6 bg-background px-6 py-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="divide-y divide-border">
        {filteredChats.map((chat) => {
          const firstQuestion =
            chat.messages.find((m) => m.role === "user")?.content ?? chat.title;
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

      {filteredChats.length === 0 && (
        <p className="py-8 text-center text-muted-foreground">
          No chats found matching your search.
        </p>
      )}
    </div>
  );
}
