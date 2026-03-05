"use client";

import Link from "next/link";
import {
  SendHorizontal,
  Plus,
  Compass,
  User,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Zap,
  BookOpen,
  MessagesSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { quickQuestions } from "@/lib/data/quick-questions";

/* ─────────────────────────────────────────────────────────────
   Shared sub-components used across all 7 designs
   ───────────────────────────────────────────────────────────── */

/** Looping avatar video used as animated avatar */
function AvatarVideo({ className }: { className?: string }) {
  return (
    <video
      src="/avatar.mp4"
      autoPlay
      loop
      muted
      playsInline
      className={cn("object-cover", className)}
    />
  );
}

/** Reusable text input bar */
function DesignInput({
  placeholder = "Ask me anything...",
  className,
  inputClassName,
}: {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <input
        type="text"
        readOnly
        placeholder={placeholder}
        className={cn(
          "w-full bg-transparent outline-none placeholder:text-muted-foreground",
          inputClassName,
        )}
      />
    </div>
  );
}

/** Reusable quick question chips */
function QuickChips({
  variant = "default",
  className,
  chipClassName,
}: {
  variant?:
    | "default"
    | "outline"
    | "pill"
    | "tag"
    | "block"
    | "minimal"
    | "card";
  className?: string;
  chipClassName?: string;
}) {
  const baseStyles: Record<string, string> = {
    default:
      "rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
    outline:
      "rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground",
    pill: "rounded-full border border-[#45475a] bg-[#313244] px-4 py-2 text-xs text-[#cdd6f4]/70 transition-all hover:bg-[#45475a] hover:text-[#cdd6f4]",
    tag: "rounded-md bg-[#313244]/80 px-3 py-1.5 text-xs font-mono text-[#89b4fa]/80 transition-all hover:bg-[#313244] hover:text-[#89b4fa]",
    block:
      "rounded-xl border border-border/40 bg-card/50 px-4 py-2.5 text-sm text-muted-foreground transition-all hover:bg-card hover:text-foreground hover:border-border",
    minimal:
      "text-xs text-muted-foreground/60 underline-offset-4 transition-all hover:text-foreground hover:underline",
    card: "rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-xs text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground",
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {quickQuestions.map((qq) => (
        <button
          key={qq.question}
          type="button"
          className={cn(baseStyles[variant], chipClassName)}
        >
          {qq.display}
        </button>
      ))}
    </div>
  );
}

/** CTA link cards */
function NavCTA({
  href,
  icon: Icon,
  label,
  description,
  className,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  description?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-muted-foreground transition-all hover:bg-card hover:text-foreground hover:border-border",
        className,
      )}
    >
      <Icon className="size-4 shrink-0" />
      <div className="flex flex-col">
        <span className="font-medium text-foreground/90">{label}</span>
        {description ? (
          <span className="text-xs text-muted-foreground/70">
            {description}
          </span>
        ) : null}
      </div>
      <ArrowRight className="ml-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 1 — "Editorial Split"
   Left column: large avatar + nav CTAs
   Right column: greeting + input + quick questions
   Tone: Magazine editorial, asymmetric, refined
   ───────────────────────────────────────────────────────────── */

function Design1() {
  return (
    <section className="flex min-h-screen flex-col border-b-2 border-dashed border-border/40 bg-background">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 1 — Editorial Split
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:flex-row lg:gap-16 lg:px-16">
        {/* Left column */}
        <div className="flex flex-col items-center gap-6 lg:items-start">
          <div className="relative overflow-hidden rounded-3xl border-2 border-border/30 shadow-2xl shadow-black/20">
            <AvatarVideo className="h-72 w-56 sm:h-80 sm:w-64 lg:h-96 lg:w-72" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-72">
            <Link
              href="/discovery"
              className="group flex items-center justify-between rounded-lg border border-border/40 bg-[#313244]/50 px-4 py-2.5 text-sm text-[#cdd6f4]/80 transition-all hover:bg-[#313244] hover:text-[#cdd6f4]"
            >
              <span className="flex items-center gap-2">
                <Compass className="size-4 text-[#89b4fa]" />
                Discovery
              </span>
              <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            <Link
              href="/about"
              className="group flex items-center justify-between rounded-lg border border-border/40 bg-[#313244]/50 px-4 py-2.5 text-sm text-[#cdd6f4]/80 transition-all hover:bg-[#313244] hover:text-[#cdd6f4]"
            >
              <span className="flex items-center gap-2">
                <User className="size-4 text-[#b4befe]" />
                About Me
              </span>
              <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            <Link
              href="/chats"
              className="group flex items-center justify-between rounded-lg border border-border/40 bg-[#313244]/50 px-4 py-2.5 text-sm text-[#cdd6f4]/80 transition-all hover:bg-[#313244] hover:text-[#cdd6f4]"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="size-4 text-[#cba6f7]" />
                Chats
              </span>
              <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="mt-10 flex flex-1 flex-col items-center justify-center lg:mt-0 lg:items-start">
          <p className="mb-1 font-mono text-xs tracking-[0.3em] uppercase text-[#89b4fa]/60">
            yanicells.dev
          </p>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hey, I&apos;m Yani.
          </h1>
          <p className="mb-8 max-w-md text-base text-muted-foreground/80 lg:text-lg">
            Full-stack developer, CS student, and builder of things for the web.
            Ask me anything below.
          </p>

          {/* Input */}
          <div className="w-full max-w-lg">
            <div className="flex items-center rounded-2xl border border-border bg-[#313244]/50 px-4 py-3 focus-within:border-[#89b4fa]/50">
              <DesignInput
                placeholder="Ask me anything..."
                inputClassName="text-base text-foreground"
              />
              <Button size="icon-sm" className="shrink-0 rounded-full">
                <SendHorizontal className="size-4" />
              </Button>
            </div>
          </div>

          {/* Quick questions */}
          <div className="mt-5 w-full max-w-lg">
            <QuickChips variant="pill" className="justify-start" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 2 — "Minimalist Center Stage"
   Everything centered. Circular avatar on top.
   Tone: Clean, breathable, Apple-inspired
   ───────────────────────────────────────────────────────────── */

function Design2() {
  return (
    <section className="flex min-h-screen flex-col border-b-2 border-dashed border-border/40 bg-[#181825]">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 2 — Minimalist Center Stage
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        {/* Avatar */}
        <div className="mb-6 overflow-hidden rounded-full border-4 border-[#45475a] shadow-xl shadow-black/30">
          <AvatarVideo className="size-28 sm:size-32" />
        </div>

        {/* Greeting */}
        <h1 className="mb-1 text-3xl font-semibold tracking-tight text-[#cdd6f4] sm:text-4xl">
          What&apos;s on your mind?
        </h1>
        <p className="mb-8 text-sm text-[#a6adc8]">
          I&apos;m Yani — ask about my work, tech, or anything.
        </p>

        {/* Input */}
        <div className="w-full max-w-xl">
          <div className="flex items-center gap-2 rounded-full border border-[#45475a] bg-[#313244]/60 px-2 py-1.5 focus-within:border-[#89b4fa]/50 focus-within:ring-1 focus-within:ring-[#89b4fa]/20">
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0 rounded-full text-[#a6adc8] hover:text-[#cdd6f4]"
            >
              <Plus className="size-4" />
            </Button>
            <DesignInput
              placeholder="Ask me anything..."
              inputClassName="text-sm text-[#cdd6f4] placeholder:text-[#a6adc8]/60 py-2"
            />
            <Button
              size="icon-sm"
              className="shrink-0 rounded-full bg-[#89b4fa] text-[#1e1e2e] hover:bg-[#74c7ec]"
            >
              <SendHorizontal className="size-4" />
            </Button>
          </div>
        </div>

        {/* Quick questions */}
        <div className="mt-5 w-full max-w-xl">
          <QuickChips variant="default" className="justify-center" />
        </div>

        {/* Nav CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/discovery"
            className="flex items-center gap-2 rounded-full border border-[#45475a]/60 px-4 py-2 text-xs text-[#a6adc8] transition-all hover:border-[#89b4fa]/40 hover:text-[#89b4fa]"
          >
            <Compass className="size-3.5" />
            Discovery
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 rounded-full border border-[#45475a]/60 px-4 py-2 text-xs text-[#a6adc8] transition-all hover:border-[#b4befe]/40 hover:text-[#b4befe]"
          >
            <User className="size-3.5" />
            About Me
          </Link>
          <Link
            href="/chats"
            className="flex items-center gap-2 rounded-full border border-[#45475a]/60 px-4 py-2 text-xs text-[#a6adc8] transition-all hover:border-[#cba6f7]/40 hover:text-[#cba6f7]"
          >
            <MessageSquare className="size-3.5" />
            Chats
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 3 — "Terminal / Dev Console"
   Monospace type, code-like aesthetic, avatar in corner
   Tone: Brutalist, developer-centric, raw
   ───────────────────────────────────────────────────────────── */

function Design3() {
  return (
    <section className="flex min-h-screen flex-col border-b-2 border-dashed border-border/40 bg-[#11111b]">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 3 — Terminal / Dev Console
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Terminal window chrome */}
          <div className="rounded-t-xl border border-[#313244] bg-[#1e1e2e] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-[#f38ba8]" />
              <div className="size-3 rounded-full bg-[#f9e2af]" />
              <div className="size-3 rounded-full bg-[#a6e3a1]" />
              <span className="ml-3 font-mono text-xs text-[#a6adc8]/60">
                yanicells@portfolio ~ $
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="rounded-b-xl border border-t-0 border-[#313244] bg-[#181825] p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 overflow-hidden rounded-lg border border-[#313244]">
                <AvatarVideo className="size-16" />
              </div>
              <div>
                <p className="font-mono text-sm text-[#a6e3a1]">$ whoami</p>
                <p className="font-mono text-sm text-[#cdd6f4] mt-1">
                  Edrian Miguel &quot;Yani&quot; Capistrano
                </p>
                <p className="font-mono text-xs text-[#a6adc8] mt-0.5">
                  Full-Stack Web Developer · CS @ Ateneo de Manila
                </p>
              </div>
            </div>

            <div className="mb-6 border-t border-[#313244] pt-4">
              <p className="font-mono text-xs text-[#a6adc8] mb-3">
                // navigate
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/discovery"
                  className="font-mono text-xs text-[#89b4fa] underline-offset-4 hover:underline flex items-center gap-1.5"
                >
                  <Compass className="size-3" />
                  /discovery
                </Link>
                <Link
                  href="/about"
                  className="font-mono text-xs text-[#b4befe] underline-offset-4 hover:underline flex items-center gap-1.5"
                >
                  <User className="size-3" />
                  /about
                </Link>
                <Link
                  href="/chats"
                  className="font-mono text-xs text-[#cba6f7] underline-offset-4 hover:underline flex items-center gap-1.5"
                >
                  <MessageSquare className="size-3" />
                  /chats
                </Link>
              </div>
            </div>

            <div className="mb-4 border-t border-[#313244] pt-4">
              <p className="font-mono text-xs text-[#a6adc8] mb-3">
                // quick queries
              </p>
              <QuickChips variant="tag" />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-[#313244] pt-4">
              <span className="font-mono text-sm text-[#a6e3a1] shrink-0">
                ❯
              </span>
              <DesignInput
                placeholder="type your question..."
                inputClassName="font-mono text-sm text-[#cdd6f4] placeholder:text-[#585b70]"
                className="flex-1"
              />
              <Button
                size="icon-sm"
                className="shrink-0 rounded-md bg-[#a6e3a1] text-[#11111b] hover:bg-[#94e2d5]"
              >
                <SendHorizontal className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 4 — "Bento Grid"
   Multiple tiles in a grid layout with avatar, chat, CTAs
   Tone: Playful, structured, modern dashboard
   ───────────────────────────────────────────────────────────── */

function Design4() {
  return (
    <section className="flex min-h-screen flex-col border-b-2 border-dashed border-border/40 bg-[#1e1e2e]">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 4 — Bento Grid
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Avatar tile — spans 1 col, tall */}
          <div className="row-span-2 overflow-hidden rounded-2xl border border-[#313244] bg-[#181825]">
            <AvatarVideo className="h-full w-full min-h-64" />
          </div>

          {/* Greeting tile */}
          <div className="col-span-1 flex flex-col justify-center rounded-2xl border border-[#313244] bg-[#181825] p-5 sm:col-span-1 lg:col-span-2">
            <p className="text-xs font-mono text-[#89b4fa] mb-1 tracking-wider uppercase">
              Hello
            </p>
            <h2 className="text-2xl font-bold text-[#cdd6f4] mb-1">
              I&apos;m Yani
            </h2>
            <p className="text-sm text-[#a6adc8]">
              Full-stack dev building cool stuff on the web.
            </p>
          </div>

          {/* Chat input tile — spans 2 */}
          <div className="flex flex-col gap-3 rounded-2xl border border-[#313244] bg-[#181825] p-5 sm:col-span-1 lg:col-span-2">
            <p className="text-xs text-[#a6adc8]">Ask me something</p>
            <div className="flex items-center gap-2 rounded-xl border border-[#45475a] bg-[#313244]/50 px-3 py-2.5">
              <DesignInput
                placeholder="What would you like to know?"
                inputClassName="text-sm text-[#cdd6f4] placeholder:text-[#585b70]"
                className="flex-1"
              />
              <Button
                size="icon-sm"
                className="shrink-0 rounded-lg bg-[#89b4fa] text-[#1e1e2e] hover:bg-[#74c7ec]"
              >
                <SendHorizontal className="size-3.5" />
              </Button>
            </div>
            <QuickChips
              variant="pill"
              chipClassName="text-[10px] px-2.5 py-1"
            />
          </div>

          {/* Discovery CTA tile */}
          <Link
            href="/discovery"
            className="group flex items-center gap-3 rounded-2xl border border-[#313244] bg-[#181825] p-5 transition-all hover:border-[#89b4fa]/30 hover:bg-[#1e1e2e]"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#89b4fa]/10">
              <Compass className="size-5 text-[#89b4fa]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#cdd6f4]">Discovery</p>
              <p className="text-xs text-[#a6adc8]">Explore my world</p>
            </div>
            <ArrowRight className="ml-auto size-4 text-[#a6adc8] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          {/* About CTA tile */}
          <Link
            href="/about"
            className="group flex items-center gap-3 rounded-2xl border border-[#313244] bg-[#181825] p-5 transition-all hover:border-[#b4befe]/30 hover:bg-[#1e1e2e]"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#b4befe]/10">
              <User className="size-5 text-[#b4befe]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#cdd6f4]">About Me</p>
              <p className="text-xs text-[#a6adc8]">My story</p>
            </div>
            <ArrowRight className="ml-auto size-4 text-[#a6adc8] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          {/* Chats CTA tile */}
          <Link
            href="/chats"
            className="group flex items-center gap-3 rounded-2xl border border-[#313244] bg-[#181825] p-5 transition-all hover:border-[#cba6f7]/30 hover:bg-[#1e1e2e]"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#cba6f7]/10">
              <MessageSquare className="size-5 text-[#cba6f7]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#cdd6f4]">Chats</p>
              <p className="text-xs text-[#a6adc8]">Pre-made convos</p>
            </div>
            <ArrowRight className="ml-auto size-4 text-[#a6adc8] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 5 — "Hero Card"
   Single floating card centered on the page with everything
   Tone: Luxury, refined, card-based, like a personal ID
   ───────────────────────────────────────────────────────────── */

function Design5() {
  return (
    <section className="flex min-h-screen flex-col border-b-2 border-dashed border-border/40 bg-[#11111b]">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 5 — Hero Card
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#313244] bg-[#1e1e2e] shadow-2xl shadow-black/40">
          {/* Avatar header */}
          <div className="relative h-48 w-full overflow-hidden">
            <AvatarVideo className="h-full w-full" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-[#1e1e2e]/90" />
          </div>

          <div className="px-6 pb-6 -mt-8 relative z-10">
            <h2 className="text-2xl font-bold text-[#cdd6f4] mb-0.5">
              Yanicells
            </h2>
            <p className="text-sm text-[#a6adc8] mb-5">
              Full-Stack Developer · CS @ Ateneo
            </p>

            {/* CTAs row */}
            <div className="flex gap-2 mb-5">
              <Link
                href="/discovery"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#89b4fa]/10 py-2.5 text-xs font-medium text-[#89b4fa] transition-colors hover:bg-[#89b4fa]/20"
              >
                <Compass className="size-3.5" />
                Discovery
              </Link>
              <Link
                href="/about"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#b4befe]/10 py-2.5 text-xs font-medium text-[#b4befe] transition-colors hover:bg-[#b4befe]/20"
              >
                <User className="size-3.5" />
                About
              </Link>
              <Link
                href="/chats"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#cba6f7]/10 py-2.5 text-xs font-medium text-[#cba6f7] transition-colors hover:bg-[#cba6f7]/20"
              >
                <MessageSquare className="size-3.5" />
                Chats
              </Link>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 rounded-2xl border border-[#45475a] bg-[#313244]/50 px-3 py-2.5 mb-4 focus-within:border-[#89b4fa]/40">
              <DesignInput
                placeholder="Ask me anything..."
                inputClassName="text-sm text-[#cdd6f4] placeholder:text-[#585b70]"
                className="flex-1"
              />
              <Button
                size="icon-sm"
                className="shrink-0 rounded-full bg-[#89b4fa] text-[#1e1e2e] hover:bg-[#74c7ec]"
              >
                <SendHorizontal className="size-3.5" />
              </Button>
            </div>

            {/* Quick questions */}
            <QuickChips
              variant="outline"
              className="justify-center"
              chipClassName="text-[10px] border-[#45475a]/60 text-[#a6adc8] hover:border-[#a6adc8]/40 hover:text-[#cdd6f4]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 6 — "Conversational / Chat Bubble"
   Designed to feel like starting an actual conversation.
   Avatar + speech bubble greeting, then input below.
   Tone: Warm, friendly, chat-like, conversational
   ───────────────────────────────────────────────────────────── */

function Design6() {
  return (
    <section className="flex min-h-screen flex-col border-b-2 border-dashed border-border/40 bg-[#1e1e2e]">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 6 — Conversational / Chat Bubble
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          {/* Avatar + bubble */}
          <div className="flex items-end gap-3 mb-8">
            <div className="shrink-0 overflow-hidden rounded-full border-2 border-[#45475a]">
              <AvatarVideo className="size-14" />
            </div>
            <div className="relative rounded-2xl rounded-bl-md bg-[#313244] px-5 py-4 shadow-lg">
              <h2 className="text-lg font-semibold text-[#cdd6f4] mb-1">
                Hey! I&apos;m Yani 👋
              </h2>
              <p className="text-sm text-[#a6adc8] leading-relaxed">
                Full-stack developer and CS student. This is my little corner of
                the internet. Ask me anything or explore around!
              </p>

              {/* CTAs inside bubble */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/discovery"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#89b4fa]/15 px-3 py-1.5 text-xs text-[#89b4fa] transition-colors hover:bg-[#89b4fa]/25"
                >
                  <Compass className="size-3" />
                  Explore Discovery
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#b4befe]/15 px-3 py-1.5 text-xs text-[#b4befe] transition-colors hover:bg-[#b4befe]/25"
                >
                  <User className="size-3" />
                  About Me
                </Link>
                <Link
                  href="/chats"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#cba6f7]/15 px-3 py-1.5 text-xs text-[#cba6f7] transition-colors hover:bg-[#cba6f7]/25"
                >
                  <MessagesSquare className="size-3" />
                  Browse Chats
                </Link>
              </div>
            </div>
          </div>

          {/* Quick questions */}
          <div className="mb-4 pl-[4.5rem]">
            <p className="text-xs text-[#a6adc8]/60 mb-2">Quick questions</p>
            <QuickChips
              variant="card"
              chipClassName="text-[11px] border-[#313244] bg-[#313244]/40 text-[#a6adc8] hover:bg-[#313244]/80 hover:text-[#cdd6f4]"
            />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 rounded-2xl border border-[#45475a] bg-[#313244]/40 px-3 py-2.5 focus-within:border-[#89b4fa]/40">
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0 rounded-full text-[#a6adc8] hover:text-[#cdd6f4]"
            >
              <Plus className="size-4" />
            </Button>
            <DesignInput
              placeholder="Type your reply..."
              inputClassName="text-sm text-[#cdd6f4] placeholder:text-[#585b70] py-1"
              className="flex-1"
            />
            <Button
              size="icon-sm"
              className="shrink-0 rounded-full bg-[#89b4fa] text-[#1e1e2e] hover:bg-[#74c7ec]"
            >
              <SendHorizontal className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 7 — "Dashboard Welcome"
   Horizontal layout with stats-like cards and a prominent
   chat area. Avatar floats beside greeting.
   Tone: SaaS dashboard, structured, informational
   ───────────────────────────────────────────────────────────── */

function Design7() {
  return (
    <section className="flex min-h-screen flex-col border-b-2 border-dashed border-border/40 bg-[#181825]">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 7 — Dashboard Welcome
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-4xl">
          {/* Top row: avatar + greeting */}
          <div className="mb-8 flex items-center gap-5">
            <div className="shrink-0 overflow-hidden rounded-2xl border border-[#313244] shadow-lg">
              <AvatarVideo className="size-20 sm:size-24" />
            </div>
            <div>
              <p className="text-xs font-mono text-[#89b4fa] tracking-wider uppercase mb-1">
                Welcome
              </p>
              <h1 className="text-3xl font-bold text-[#cdd6f4] sm:text-4xl">
                I&apos;m Yanicells
              </h1>
              <p className="text-sm text-[#a6adc8] mt-1">
                Full-Stack Developer · CS Student · Builder
              </p>
            </div>
          </div>

          {/* CTA tiles row */}
          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              href="/discovery"
              className="group flex items-center gap-4 rounded-xl border border-[#313244] bg-[#1e1e2e] p-4 transition-all hover:border-[#89b4fa]/30"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-[#89b4fa]/10">
                <Compass className="size-5 text-[#89b4fa]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#cdd6f4]">Discovery</p>
                <p className="text-xs text-[#a6adc8]">Anime, music, photos</p>
              </div>
              <ChevronRight className="size-4 text-[#45475a] transition-colors group-hover:text-[#89b4fa]" />
            </Link>

            <Link
              href="/about"
              className="group flex items-center gap-4 rounded-xl border border-[#313244] bg-[#1e1e2e] p-4 transition-all hover:border-[#b4befe]/30"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-[#b4befe]/10">
                <BookOpen className="size-5 text-[#b4befe]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#cdd6f4]">About Me</p>
                <p className="text-xs text-[#a6adc8]">My journey & story</p>
              </div>
              <ChevronRight className="size-4 text-[#45475a] transition-colors group-hover:text-[#b4befe]" />
            </Link>

            <Link
              href="/chats"
              className="group flex items-center gap-4 rounded-xl border border-[#313244] bg-[#1e1e2e] p-4 transition-all hover:border-[#cba6f7]/30"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-[#cba6f7]/10">
                <MessagesSquare className="size-5 text-[#cba6f7]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#cdd6f4]">Chats</p>
                <p className="text-xs text-[#a6adc8]">Curated conversations</p>
              </div>
              <ChevronRight className="size-4 text-[#45475a] transition-colors group-hover:text-[#cba6f7]" />
            </Link>
          </div>

          {/* Chat section */}
          <div className="rounded-2xl border border-[#313244] bg-[#1e1e2e] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="size-4 text-[#f9e2af]" />
              <span className="text-sm font-medium text-[#cdd6f4]">
                Ask me anything
              </span>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 rounded-xl border border-[#45475a] bg-[#313244]/40 px-3 py-3 mb-4 focus-within:border-[#89b4fa]/40">
              <Button
                variant="ghost"
                size="icon-sm"
                className="shrink-0 rounded-full text-[#a6adc8] hover:text-[#cdd6f4]"
              >
                <Plus className="size-4" />
              </Button>
              <DesignInput
                placeholder="What would you like to know about me?"
                inputClassName="text-sm text-[#cdd6f4] placeholder:text-[#585b70] py-0.5"
                className="flex-1"
              />
              <Button
                size="icon-sm"
                className="shrink-0 rounded-lg bg-[#89b4fa] text-[#1e1e2e] hover:bg-[#74c7ec]"
              >
                <SendHorizontal className="size-4" />
              </Button>
            </div>

            {/* Quick questions */}
            <QuickChips
              variant="block"
              chipClassName="text-xs border-[#313244] bg-[#313244]/60 text-[#a6adc8] hover:bg-[#45475a]/60 hover:text-[#cdd6f4] hover:border-[#45475a]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Shared: Exact input bar from chat-interface.tsx
   Pixel-for-pixel copy of the real ChatInputBar empty state.
   ───────────────────────────────────────────────────────────── */

function ExactInputBar() {
  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-3xl">
        <div className="relative flex min-h-12 flex-1 items-center rounded-full border border-border bg-muted/50 py-1 pl-2 pr-1.5 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/50">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="New chat"
            className="shrink-0 rounded-full text-muted-foreground hover:text-foreground"
          >
            <Plus className="size-4" />
          </Button>
          <textarea
            readOnly
            placeholder="Ask anything"
            rows={1}
            className="max-h-50 w-full resize-none self-center bg-transparent py-2 pl-2 text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
          />
          <Button
            type="button"
            variant="default"
            size="icon-sm"
            disabled
            aria-label="Send message"
            className="shrink-0 rounded-full"
          >
            <SendHorizontal className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Exact quick question chips from chat-interface.tsx */
function ExactQuickChips() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-2 px-4">
      {quickQuestions.map((qq) => (
        <button
          key={qq.question}
          type="button"
          className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-4 sm:text-sm"
        >
          {qq.display}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 8 — Based on Design 1 (Editorial Split)
   2-col: avatar left (PERFECT SIZE), right = editorial text
   format (yanicells.dev / Hey I'm Yani / Full-stack...)
   + CTAs below text. Exact input bar + chips at bottom center.
   ───────────────────────────────────────────────────────────── */

function Design8() {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col border-b-2 border-dashed border-border/40">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 8 — Editorial 2-Col (from D1)
      </div>
      <div className="flex flex-1 flex-col">
        {/* Top content: 2-col layout */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 lg:flex-row lg:gap-12 lg:px-12">
          {/* Left: Avatar */}
          <div className="shrink-0">
            <div className="overflow-hidden rounded-3xl border-2 border-border/30 shadow-2xl shadow-black/20">
              <AvatarVideo className="h-72 w-56 sm:h-80 sm:w-64 lg:h-96 lg:w-72" />
            </div>
          </div>

          {/* Right: Text + CTAs */}
          <div className="mt-8 flex flex-col lg:mt-0">
            <p className="mb-1 font-mono text-xs tracking-[0.3em] uppercase text-primary/60">
              yanicells.dev
            </p>
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Hey, I&apos;m Yani.
            </h1>
            <p className="mb-8 max-w-md text-base text-muted-foreground/80 lg:text-lg">
              Full-stack developer, CS student, and builder of things for the
              web. Ask me anything below.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-2 max-w-72">
              <Link
                href="/discovery"
                className="group flex items-center justify-between rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-muted-foreground transition-all hover:bg-card hover:text-foreground hover:border-border"
              >
                <span className="flex items-center gap-2.5">
                  <Compass className="size-4 text-primary" />
                  Discovery
                </span>
                <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link
                href="/about"
                className="group flex items-center justify-between rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-muted-foreground transition-all hover:bg-card hover:text-foreground hover:border-border"
              >
                <span className="flex items-center gap-2.5">
                  <User className="size-4 text-accent" />
                  About Me
                </span>
                <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link
                href="/chats"
                className="group flex items-center justify-between rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-muted-foreground transition-all hover:bg-card hover:text-foreground hover:border-border"
              >
                <span className="flex items-center gap-2.5">
                  <MessageSquare className="size-4 text-[#cba6f7]" />
                  Chats
                </span>
                <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: exact input + chips */}
        <div className="w-full space-y-4 px-4 pb-6">
          <ExactInputBar />
          <ExactQuickChips />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 9 — Based on Design 2 (Minimalist Center)
   Centered layout, bigger avatar, CTAs between greeting
   and input (not buried at bottom). Exact input + chips.
   ───────────────────────────────────────────────────────────── */

function Design9() {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col border-b-2 border-dashed border-border/40">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 9 — Centered Big Avatar (from D2)
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
          {/* Avatar — bigger */}
          <div className="mb-6 overflow-hidden rounded-full border-4 border-border shadow-xl shadow-black/30">
            <AvatarVideo className="size-36 sm:size-40" />
          </div>

          {/* Greeting */}
          <h1 className="mb-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What&apos;s on your mind?
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            I&apos;m Yani — ask about my work, tech, or anything.
          </p>

          {/* CTAs — between greeting and input */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/discovery"
              className="flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
            >
              <Compass className="size-3.5" />
              Discovery
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs text-muted-foreground transition-all hover:border-accent/40 hover:text-accent"
            >
              <User className="size-3.5" />
              About Me
            </Link>
            <Link
              href="/chats"
              className="flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs text-muted-foreground transition-all hover:border-[#cba6f7]/40 hover:text-[#cba6f7]"
            >
              <MessageSquare className="size-3.5" />
              Chats
            </Link>
          </div>
        </div>

        {/* Bottom: exact input + chips */}
        <div className="w-full space-y-4 px-4 pb-6">
          <ExactInputBar />
          <ExactQuickChips />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 10 — Based on Design 4 (Bento Grid)
   Minimal bento tiles for avatar + greeting + CTAs above.
   Exact input + chips pinned at bottom.
   ───────────────────────────────────────────────────────────── */

function Design10() {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col border-b-2 border-dashed border-border/40">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 10 — Minimal Bento (from D4)
      </div>
      <div className="flex flex-1 flex-col">
        {/* Bento grid above */}
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Avatar tile — tall */}
            <div className="row-span-2 overflow-hidden rounded-2xl border border-border bg-card">
              <AvatarVideo className="h-full w-full min-h-64" />
            </div>

            {/* Greeting tile */}
            <div className="col-span-1 flex flex-col justify-center rounded-2xl border border-border bg-card p-5 lg:col-span-2">
              <p className="text-xs font-mono text-primary mb-1 tracking-wider uppercase">
                Hello
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                I&apos;m Yani
              </h2>
              <p className="text-sm text-muted-foreground">
                Full-stack dev building cool stuff on the web.
              </p>
            </div>

            {/* Discovery CTA */}
            <Link
              href="/discovery"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Compass className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Discovery</p>
                <p className="text-xs text-muted-foreground">
                  Explore my world
                </p>
              </div>
              <ArrowRight className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            {/* About CTA */}
            <Link
              href="/about"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:border-accent/30"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
                <User className="size-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">About Me</p>
                <p className="text-xs text-muted-foreground">My story</p>
              </div>
              <ArrowRight className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            {/* Chats CTA */}
            <Link
              href="/chats"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:border-[#cba6f7]/30"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#cba6f7]/10">
                <MessageSquare className="size-5 text-[#cba6f7]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Chats</p>
                <p className="text-xs text-muted-foreground">Pre-made convos</p>
              </div>
              <ArrowRight className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
        </div>

        {/* Bottom: exact input + chips */}
        <div className="w-full space-y-4 px-4 pb-6">
          <ExactInputBar />
          <ExactQuickChips />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESIGN 11 — Based on Design 7 (Dashboard Welcome)
   2-col: left = avatar (smaller col), right = welcome text
   + CTA tiles (bigger col). Exact input + chips below.
   ───────────────────────────────────────────────────────────── */

function Design11() {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col border-b-2 border-dashed border-border/40">
      <div className="px-5 py-3 text-xs font-mono text-muted-foreground/50 tracking-widest uppercase">
        Design 11 — 2-Col Dashboard (from D7)
      </div>
      <div className="flex flex-1 flex-col">
        {/* 2-col content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 lg:flex-row lg:gap-10 lg:px-12">
          {/* Left: Avatar */}
          <div className="shrink-0">
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
              <AvatarVideo className="h-64 w-48 sm:h-72 sm:w-56 lg:h-80 lg:w-60" />
            </div>
          </div>

          {/* Right: Content + CTAs */}
          <div className="mt-8 flex flex-1 flex-col lg:mt-0">
            <p className="text-xs font-mono text-primary tracking-wider uppercase mb-1">
              Welcome
            </p>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              I&apos;m Yanicells
            </h1>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              Full-Stack Developer · CS Student · Builder
            </p>

            {/* CTA tiles */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Link
                href="/discovery"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Compass className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    Discovery
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Anime, music, photos
                  </p>
                </div>
                <ChevronRight className="size-4 text-border transition-colors group-hover:text-primary" />
              </Link>

              <Link
                href="/about"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-accent/30"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
                  <BookOpen className="size-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    About Me
                  </p>
                  <p className="text-xs text-muted-foreground">
                    My journey & story
                  </p>
                </div>
                <ChevronRight className="size-4 text-border transition-colors group-hover:text-accent" />
              </Link>

              <Link
                href="/chats"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-[#cba6f7]/30"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#cba6f7]/10">
                  <MessagesSquare className="size-5 text-[#cba6f7]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Chats</p>
                  <p className="text-xs text-muted-foreground">
                    Curated conversations
                  </p>
                </div>
                <ChevronRight className="size-4 text-border transition-colors group-hover:text-[#cba6f7]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: exact input + chips */}
        <div className="w-full space-y-4 px-4 pb-6">
          <ExactInputBar />
          <ExactQuickChips />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main export — stacks all 11 designs
   ───────────────────────────────────────────────────────────── */

export function HomeDesigns() {
  return (
    <div className="flex flex-col">
      <Design1 />
      <Design2 />
      <Design3 />
      <Design4 />
      <Design5 />
      <Design6 />
      <Design7 />
      <Design8 />
      <Design9 />
      <Design10 />
      <Design11 />
    </div>
  );
}
