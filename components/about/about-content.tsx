import Image from "next/image";
import Link from "next/link";
import { CollapsibleStory } from "@/components/about/collapsible-story";

/** Hero section — profile image, name, role, social links */
function AboutHero() {
  return (
    <div className="flex flex-col-reverse items-center gap-6 sm:flex-row sm:gap-8">
      {/* Text Content */}
      <div className="flex-1 text-center sm:text-left">
        <p className="mb-1 text-sm font-medium text-primary sm:text-base">
          Hi, I&apos;m
        </p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Edrian Miguel E. Capistrano
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Full-Stack Web Developer
        </p>
        <p className="mt-0.5 font-mono text-xs text-muted-foreground/80 sm:text-sm">
          BS Computer Science · Ateneo de Manila University
        </p>

        {/* Social Links */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <a
            href="https://resume.yanicells.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-300 hover:text-primary"
            aria-label="Resume"
          >
            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          </a>
          <a
            href="mailto:edrianmiguelcapistrano@gmail.com"
            className="text-muted-foreground transition-colors duration-300 hover:text-primary"
            aria-label="Email"
          >
            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/yanicells"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-300 hover:text-primary"
            aria-label="LinkedIn"
          >
            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="https://github.com/yanicells"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-300 hover:text-primary"
            aria-label="GitHub"
          >
            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/edrian.capistrano.9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-300 hover:text-primary"
            aria-label="Facebook"
          >
            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/yahneyy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-300 hover:text-primary"
            aria-label="Instagram"
          >
            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Profile Image */}
      <div className="shrink-0">
        <div className="relative size-36 overflow-hidden rounded-full border-4 border-border shadow-xl transition-all duration-300 hover:scale-105 hover:border-muted-foreground sm:size-44">
          <Image
            src="/yani.png"
            alt="Edrian Miguel E. Capistrano"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

/** Brief intro blurb — kept short, no tech stack */
function BriefIntro() {
  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
        About Me
      </h2>
      <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
        I&apos;m a 2nd year CS student at Ateneo who learns by building things.
        I&apos;m active in a few tech orgs on campus doing dev work and running
        workshops. Lately I&apos;ve been getting into AI integration and want to
        move beyond just calling APIs to actually building AI systems and
        workflows. I prefer shipping fast and iterating over planning forever,
        and I use AI tools heavily to accelerate my learning and coding.
      </p>
    </div>
  );
}

/** What I'm up to right now — always visible */
function Currently() {
  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
        Currently
      </h2>
      <ul className="space-y-2.5 text-sm text-foreground/90 sm:text-base">
        <li className="flex items-start gap-2.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-(--ctp-green)" />
          Studying BS Computer Science at Ateneo de Manila University
        </li>
        <li className="flex items-start gap-2.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-(--ctp-blue)" />
          Building full-stack web apps and working on personal projects
        </li>
        <li className="flex items-start gap-2.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-(--ctp-peach)" />
          Open to internship and freelance opportunities
        </li>
      </ul>
    </div>
  );
}

export function AboutContent() {
  return (
    <article className="space-y-8">
      {/* Hero — name, role, social links, profile pic */}
      <AboutHero />

      <hr className="border-border" />

      {/* Brief intro */}
      <BriefIntro />

      {/* Currently */}
      <Currently />

      <hr className="border-border" />

      {/* Collapsible My Story — title + image teaser always visible */}
      <CollapsibleStory />

      {/* Footer CTA — always visible */}
      <div className="rounded-lg border border-border bg-card/50 p-5">
        <p className="text-sm text-muted-foreground">
          Want to see what I&apos;ve been building?{" "}
          <Link
            href="/projects"
            className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
          >
            Check out my projects &rarr;
          </Link>
        </p>
      </div>
    </article>
  );
}
