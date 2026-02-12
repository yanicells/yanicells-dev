"use client";

import Link from "next/link";
import Image from "next/image";
import { chats } from "@/lib/data/chats";
import {
  Clapperboard,
  Camera,
  Music,
  BookOpen,
  MessageCircle,
  FolderKanban,
  Briefcase,
  Layers,
  Mail,
  ArrowRight,
} from "lucide-react";

/** A card in the discovery grid. */
interface DiscoveryCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  accent: string;
  /** Tailwind classes for grid span on md+ */
  gridClass?: string;
  image?: string;
}

const yaniCellsCards: DiscoveryCard[] = [
  {
    title: "Anime",
    description:
      "My watchlist with personal ratings and thoughts on 70+ series",
    href: "/anime",
    icon: <Clapperboard className="size-5" />,
    accent: "from-[var(--ctp-pink)]/20 to-[var(--ctp-lavender)]/10",
    gridClass: "md:col-span-2 md:row-span-2",
    image: "/yani.png",
  },
  {
    title: "Photography",
    description: "Moments and perspectives through the lens",
    href: "/photography",
    icon: <Camera className="size-5" />,
    accent: "from-[var(--ctp-teal)]/20 to-[var(--ctp-blue)]/10",
    gridClass: "md:col-span-1",
  },
  {
    title: "Music",
    description: "Top tracks and artists from Spotify",
    href: "/music",
    icon: <Music className="size-5" />,
    accent: "from-[var(--ctp-green)]/20 to-[var(--ctp-teal)]/10",
    gridClass: "md:col-span-1",
  },
  {
    title: "My Story",
    description: "How I stumbled into programming",
    href: "/my-story",
    icon: <BookOpen className="size-5" />,
    accent: "from-[var(--ctp-peach)]/20 to-[var(--ctp-yellow)]/10",
    gridClass: "md:col-span-2",
  },
];

const mainCards: DiscoveryCard[] = [
  {
    title: "Chat with Me",
    description: "Talk to my AI-powered chatbot",
    href: "/",
    icon: <MessageCircle className="size-5" />,
    accent: "from-[var(--ctp-blue)]/20 to-[var(--ctp-lavender)]/10",
    gridClass: "md:col-span-1",
  },
  {
    title: "Projects",
    description: "Full-stack apps and experiments",
    href: "/projects",
    icon: <FolderKanban className="size-5" />,
    accent: "from-[var(--ctp-lavender)]/20 to-[var(--ctp-pink)]/10",
    gridClass: "md:col-span-1",
  },
  {
    title: "Experience",
    description: "Work and org timeline",
    href: "/experience",
    icon: <Briefcase className="size-5" />,
    accent: "from-[var(--ctp-yellow)]/20 to-[var(--ctp-peach)]/10",
    gridClass: "md:col-span-1",
  },
  {
    title: "Tech Stack",
    description: "Tools and technologies I use",
    href: "/tech-stack",
    icon: <Layers className="size-5" />,
    accent: "from-[var(--ctp-mint)]/20 to-[var(--ctp-green)]/10",
    gridClass: "md:col-span-1",
  },
  {
    title: "Contact",
    description: "Get in touch",
    href: "/contact",
    icon: <Mail className="size-5" />,
    accent: "from-[var(--ctp-red-pink)]/20 to-[var(--ctp-pink)]/10",
    gridClass: "md:col-span-1",
  },
];

function GridCard({ card }: { card: DiscoveryCard }) {
  const isLarge = card.gridClass?.includes("row-span-2");

  return (
    <Link
      href={card.href}
      className={`group relative flex overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-muted-foreground/50 hover:shadow-lg ${card.gridClass ?? ""} ${isLarge ? "min-h-[280px] flex-col" : "min-h-[120px] flex-col justify-end"}`}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      {/* Image for large cards */}
      {isLarge && card.image && (
        <div className="relative flex-1">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover opacity-40 transition-opacity duration-300 group-hover:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col gap-2 p-4 ${isLarge ? "mt-auto" : ""}`}
      >
        <div className="flex items-center gap-2 text-muted-foreground transition-colors duration-300 group-hover:text-primary">
          {card.icon}
          <span className="text-xs font-medium uppercase tracking-wider">
            {card.title}
          </span>
        </div>
        <p
          className={`font-semibold text-foreground ${isLarge ? "text-lg sm:text-xl" : "text-sm"}`}
        >
          {card.description}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Explore</span>
          <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function ChatPreviewCard({ chat }: { chat: (typeof chats)[number] }) {
  const firstMessage = chat.messages[1]; // first model response
  const preview = firstMessage?.content.slice(0, 80) + "...";

  return (
    <Link
      href={`/chats/${chat.slug}`}
      className="group flex flex-col gap-2 rounded-lg border border-border bg-card p-3.5 transition-all duration-300 hover:border-muted-foreground/50 hover:shadow-md"
    >
      <p className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
        {chat.title}
      </p>
      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {preview}
      </p>
      <div className="mt-auto flex items-center gap-1 text-xs text-muted-foreground/60 transition-colors duration-300 group-hover:text-primary">
        <MessageCircle className="size-3" />
        <span>{chat.messages.length} messages</span>
      </div>
    </Link>
  );
}

export function DiscoveryContent() {
  return (
    <div className="space-y-10">
      {/* Yani's Cells Grid — bento-style */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Yani&apos;s Cells
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {yaniCellsCards.map((card) => (
            <GridCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      {/* Main Pages Grid */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Main
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {mainCards.map((card) => (
            <GridCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      {/* Premade Chats */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Premade Chats
          </h2>
          <Link
            href="/chats"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            View all
            <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {chats.map((chat) => (
            <ChatPreviewCard key={chat.slug} chat={chat} />
          ))}
        </div>
      </section>
    </div>
  );
}
