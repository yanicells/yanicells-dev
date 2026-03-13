"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, User, FolderKanban, Mail, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── CTA Data ─────────────────────────────────────────────────────────────── */

const navLinks = [
  {
    icon: Compass,
    label: "Discovery",
    description: "Explore here",
    href: "/discovery",
    color: "text-(--ctp-blue)",
    bgColor: "bg-(--ctp-blue)/10",
  },
  {
    icon: FolderKanban,
    label: "Projects",
    description: "What I've built",
    href: "/projects",
    color: "text-(--ctp-blue)",
    bgColor: "bg-(--ctp-blue)/10",
  },
  {
    icon: User,
    label: "About Me",
    description: "My story",
    href: "/about",
    color: "text-(--ctp-blue)",
    bgColor: "bg-(--ctp-blue)/10",
  },
  {
    icon: Mail,
    label: "Contact",
    description: "Get in touch",
    href: "/contact",
    color: "text-(--ctp-blue)",
    bgColor: "bg-(--ctp-blue)/10",
  },
] as const;

/* ─── Rotating roles for the typewriter ──────────────────────────────────── */

const roles = [
  "a Full-Stack Developer",
  "an AI Developer",
  "a CS Student",
  "a Web Developer",
  "isang Atenista",
  "taga Iligan",
  "proud Bisdak",
];

/* ─── Typing hooks ────────────────────────────────────────────────────────── */

/**
 * Cycles through `items`, typing each in then deleting it.
 * Returns the current visible substring.
 */
function useTypeLoop(
  items: string[],
  typeSpeed = 70,
  deleteSpeed = 60,
  pauseMs = 2000,
  initialDelay = 1500,
): string {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const currentWord = items[index];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    // Initial pause before starting the typing loop
    if (!hasStarted) {
      timeout = setTimeout(() => setHasStarted(true), initialDelay);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting) {
      // Typing forward
      if (displayed.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        // Pause then start deleting
        timeout = setTimeout(() => setIsDeleting(true), pauseMs);
      }
    } else {
      // Deleting
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length - 1));
        }, deleteSpeed);
      } else {
        // Move to next word
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % items.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayed,
    isDeleting,
    currentWord,
    items.length,
    typeSpeed,
    deleteSpeed,
    pauseMs,
    hasStarted,
    initialDelay,
  ]);

  return displayed;
}

/* ─── Hero Section ────────────────────────────────────────────────────────── */

/**
 * Hero for the home page empty state.
 * 2-col: avatar video left, editorial text + CTAs right.
 * On mobile: stacked vertically, fits in viewport.
 */
export function HeroSection({ greeting }: { greeting: string }) {
  const typedRole = useTypeLoop(roles, 70, 60, 2000, 1500);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-4 opacity-0 md:flex-row md:items-center md:gap-6 lg:gap-6",
        greeting && "animate-fadeInUp",
      )}
    >
      {/* Left: Avatar video — no border */}
      <div className="shrink-0">
        <div className="overflow-hidden">
          <video
            src="/avatar.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-64 w-60 object-cover md:h-84 md:w-72 lg:h-96 lg:w-84"
          />
        </div>
      </div>

      {/* Right: Text + CTAs */}
      <div className="flex w-full max-w-xs flex-col items-center sm:max-w-sm md:max-w-none md:items-start">
        <p className="mb-0.5 font-mono text-xs tracking-[0.3em] uppercase text-primary/60 sm:text-[10px] md:text-xs">
          yanicells.dev
        </p>

        {/* Greeting */}
        <h1 className="mb-1 min-h-[1.2em] text-2xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
          {greeting || "\u00A0"}
        </h1>

        {/* Role line — typing loop */}
        <p className="mb-3 text-sm text-muted-foreground sm:text-base md:mb-4 lg:text-lg">
          Hey, I&apos;m Yani —{" "}
          <span className="font-medium text-foreground">
            {typedRole}
            <span className="animate-pulse text-primary">|</span>
          </span>
        </p>

        {/* Ask me anything */}
        <p className="mb-4 text-xs text-muted-foreground/70 sm:text-sm md:mb-5">
          Ask me anything below.
        </p>

        {/* 2×2 CTA grid — same card style as /contact */}
        <div className="grid grid-cols-2 gap-1.5 sm:max-w-sm sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group flex items-center gap-2 overflow-hidden rounded-xl border border-border px-2 py-1 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50 sm:gap-3 sm:p-3.5"
            >
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${link.bgColor} sm:size-9`}
              >
                <link.icon className={`size-3 ${link.color} sm:size-4`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground sm:text-sm">
                  {link.label}
                </p>
                <p className="hidden truncate text-[10px] text-muted-foreground sm:block sm:text-xs">
                  {link.description}
                </p>
              </div>
              <ArrowUpRight className="hidden size-3.5 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground sm:block" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
