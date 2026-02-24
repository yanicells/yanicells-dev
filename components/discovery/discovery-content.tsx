"use client";

import Link from "next/link";
import Image from "next/image";
import { chats } from "@/lib/data/chats";
import { projects } from "@/lib/data/projects";
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
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

/* ── Static data ── */

const spotlightProjects = [
  projects.find((p) => p.slug === "unisort"),
  projects.find((p) => p.slug === "chika"),
].filter(Boolean) as (typeof projects)[number][];

const quickLinks = [
  {
    label: "Chat",
    href: "/",
    icon: <MessageCircle className="size-4" />,
    color: "text-(--ctp-blue)",
    hover: "hover:bg-(--ctp-blue)/10 hover:border-(--ctp-blue)/30",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <FolderKanban className="size-4" />,
    color: "text-(--ctp-lavender)",
    hover: "hover:bg-(--ctp-lavender)/10 hover:border-(--ctp-lavender)/30",
  },
  {
    label: "Experience",
    href: "/experience",
    icon: <Briefcase className="size-4" />,
    color: "text-(--ctp-yellow)",
    hover: "hover:bg-(--ctp-yellow)/10 hover:border-(--ctp-yellow)/30",
  },
  {
    label: "Tech Stack",
    href: "/tech-stack",
    icon: <Layers className="size-4" />,
    color: "text-(--ctp-mint)",
    hover: "hover:bg-(--ctp-mint)/10 hover:border-(--ctp-mint)/30",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <Mail className="size-4" />,
    color: "text-(--ctp-red-pink)",
    hover: "hover:bg-(--ctp-red-pink)/10 hover:border-(--ctp-red-pink)/30",
  },
];

const photoGrid = [
  {
    src: "/photos/1.png",
    className: "col-span-2 row-span-2",
  },
  { src: "/photos/IMG_2032.jpg", className: "col-span-1" },
  { src: "/photos/3.png", className: "col-span-1" },
  { src: "/photos/5.png", className: "col-span-1" },
  {
    src: "/photos/IMG_2161.jpg",
    className: "col-span-1",
  },
];

/* ── Component ── */

export function DiscoveryContent() {
  return (
    <div className="space-y-10">
      {/* ═══ Page Title ═══ */}
      <h1
        className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3"
        style={{ animation: "fadeInUp 0.5s ease both" }}
      >
        Yani&apos;s Cells
      </h1>

      {/* ═══ Hero Mosaic ═══ */}
      <section>
        <div className="grid auto-rows-[140px] grid-cols-2 gap-3 md:grid-cols-12 md:auto-rows-[155px]">
          {/* ── Intro / About ── */}
          <Link
            href="/about"
            className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-(--ctp-blue)/40 hover:shadow-xl hover:shadow-(--ctp-blue)/5 md:col-span-5"
            style={{ animation: "fadeInUp 0.5s ease both" }}
          >
            <Image
              src="/yani.png"
              alt="Yani"
              fill
              className="object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-card via-card/65 to-card/20" />

            {/* Decorative dots */}
            <div className="absolute right-4 top-4 grid grid-cols-3 gap-1 opacity-20">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="size-1 rounded-full bg-(--ctp-blue)" />
              ))}
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-(--ctp-blue)/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-(--ctp-blue) backdrop-blur-sm">
                <Sparkles className="size-3" />
                Welcome
              </span>
              <h2 className="text-2xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-3xl">
                yanicells
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                CS student · Full-stack dev · Photographer · Weeb — my corner of
                the internet.
              </p>
            </div>
          </Link>

          {/* ── Photography ── */}
          <Link
            href="/photography"
            className="group relative col-span-1 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-(--ctp-teal)/40 hover:shadow-xl hover:shadow-(--ctp-teal)/5 md:col-span-4"
            style={{ animation: "fadeInUp 0.5s ease 0.06s both" }}
          >
            <Image
              src="/photos/IMG_2084.jpg"
              alt="Photography"
              fill
              className="object-cover opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-50"
            />
            <div className="absolute inset-0 bg-linear-to-br from-card/90 via-card/40 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between p-4">
              <div className="flex items-center gap-2 text-(--ctp-teal)">
                <Camera className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                  Photography
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                Moments &amp; perspectives through the lens
              </p>
            </div>
          </Link>

          {/* ── Music ── */}
          <Link
            href="/music"
            className="group relative col-span-1 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-(--ctp-green)/40 hover:shadow-xl hover:shadow-(--ctp-green)/5 md:col-span-3"
            style={{ animation: "fadeInUp 0.5s ease 0.12s both" }}
          >
            <Image
              src="/multo.png"
              alt="Music"
              fill
              className="object-cover opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:opacity-45"
            />
            <div className="absolute inset-0 bg-linear-to-br from-card/90 via-card/40 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between p-4">
              <div className="flex items-center gap-2 text-(--ctp-green)">
                <Music className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                  Music
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                Top tracks &amp; artists from Spotify
              </p>
            </div>
          </Link>

          {/* ── Anime ── */}
          <Link
            href="/anime"
            className="group relative col-span-1 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-(--ctp-pink)/40 hover:shadow-xl hover:shadow-(--ctp-pink)/5 md:col-span-3"
            style={{ animation: "fadeInUp 0.5s ease 0.18s both" }}
          >
            <Image
              src="/anime.png"
              alt="Anime"
              fill
              className="object-cover opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:opacity-45"
            />
            <div className="absolute inset-0 bg-linear-to-br from-card/90 via-card/40 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between p-4">
              <div className="flex items-center gap-2 text-(--ctp-pink)">
                <Clapperboard className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                  Anime
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  70+ series rated
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Watchlist &amp; personal reviews
                </p>
              </div>
            </div>
          </Link>

          {/* ── About Me ── */}
          <Link
            href="/about"
            className="group relative col-span-1 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-(--ctp-peach)/40 hover:shadow-xl hover:shadow-(--ctp-peach)/5 md:col-span-4"
            style={{ animation: "fadeInUp 0.5s ease 0.24s both" }}
          >
            <Image
              src="/story.JPG"
              alt="About Me"
              fill
              className="object-cover opacity-25 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
            />
            <div className="absolute inset-0 bg-linear-to-r from-card/95 via-card/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between p-4">
              <div className="flex items-center gap-2 text-(--ctp-peach)">
                <BookOpen className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                  About Me
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                How I stumbled into programming
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══ Project Spotlight + Explore + Conversations ═══ */}
      <section
        className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-6"
        style={{ animation: "fadeInUp 0.5s ease 0.3s both" }}
      >
        {/* ── Project Spotlight (wide, 2 cards stacked) ── */}
        <div className="flex flex-col md:col-span-8">
          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Project Spotlight
          </h3>
          <div className="flex flex-651 flex-col gap-3">
            {spotlightProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative flex min-h-[185px] flex-1 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-(--ctp-lavender)/40 hover:shadow-xl hover:shadow-(--ctp-lavender)/5 sm:min-h-[210px]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/60 to-transparent" />
                {/* Featured badge */}
                <div className="absolute left-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-(--ctp-lavender) backdrop-blur-sm">
                    <FolderKanban className="size-3" />
                    Featured
                  </span>
                </div>
                {/* Info at bottom */}
                <div className="relative z-10 mt-auto flex flex-col gap-1.5 p-4">
                  <h3 className="text-base font-bold text-foreground transition-colors duration-200 group-hover:text-(--ctp-lavender) sm:text-lg">
                    {project.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:line-clamp-none">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Explore + Conversations (stacked column) ── */}
        <div className="space-y-6 md:col-span-4">
          {/* Explore links */}
          <div>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
              {quickLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex min-h-12 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all duration-200 ${index === quickLinks.length - 1 ? "col-span-2 md:col-span-1" : ""} ${link.hover}`}
                >
                  <span className={link.color}>{link.icon}</span>
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {link.label}
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Conversations */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Conversations
              </h3>
              <Link
                href="/chats"
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                View all <ArrowUpRight className="size-3" />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {chats.map((chat) => {
                const preview =
                  (chat.messages[1]?.content.slice(0, 80) ?? "") + "…";
                return (
                  <Link
                    key={chat.slug}
                    href={`/chats/${chat.slug}`}
                    className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-3.5 transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-lg"
                  >
                    <p className="text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                      {chat.title}
                    </p>
                    <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground">
                      {preview}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
                      <MessageCircle className="size-3" />
                      <span>{chat.messages.length} messages</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Through My Lens — Photo Collage ═══ */}
      <section style={{ animation: "fadeInUp 0.5s ease 0.42s both" }}>
        <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Through My Lens
        </h3>
        <Link href="/photography" className="block">
          <div className="grid auto-rows-[120px] grid-cols-2 gap-2 sm:grid-cols-4 sm:auto-rows-[130px]">
            {photoGrid.map((photo, i) => (
              <div
                key={photo.src}
                className={`group relative overflow-hidden rounded-xl ${photo.className}`}
              >
                <Image
                  src={photo.src}
                  alt={`Photo ${i + 1}`}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/0" />
              </div>
            ))}
          </div>
        </Link>
      </section>
    </div>
  );
}
