import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  MapPin,
  FileText,
  ArrowUpRight,
  ExternalLink,
  Terminal,
  ChevronRight,
  Globe,
  Send,
  Copy,
  Sparkles,
  MessageCircle,
  User,
  Briefcase,
} from "lucide-react";

const resumeLinks = [
  {
    icon: FileText,
    label: "Resume",
    description: "Summary of my experience",
    href: "https://resume.yanicells.dev",
  },
  {
    icon: FileText,
    label: "CV",
    description: "Detailed curriculum vitae",
    href: "https://cv.yanicells.dev",
  },
];

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "edrianmiguelcapistrano@gmail.com",
    href: "mailto:edrianmiguelcapistrano@gmail.com",
    color: "text-(--ctp-red)",
    bgColor: "bg-(--ctp-red)/10",
    borderColor: "border-(--ctp-red)/20",
    hoverBg: "hover:bg-(--ctp-red)/15",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "yanicells",
    href: "https://www.linkedin.com/in/yanicells",
    color: "text-(--ctp-blue)",
    bgColor: "bg-(--ctp-blue)/10",
    borderColor: "border-(--ctp-blue)/20",
    hoverBg: "hover:bg-(--ctp-blue)/15",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "yanicells",
    href: "https://github.com/yanicells",
    color: "text-(--ctp-purple)",
    bgColor: "bg-(--ctp-purple)/10",
    borderColor: "border-(--ctp-purple)/20",
    hoverBg: "hover:bg-(--ctp-purple)/15",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Edrian Capistrano",
    href: "https://www.facebook.com/edrian.capistrano.9",
    color: "text-(--ctp-teal)",
    bgColor: "bg-(--ctp-teal)/10",
    borderColor: "border-(--ctp-teal)/20",
    hoverBg: "hover:bg-(--ctp-teal)/15",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@yahneyy",
    href: "https://www.instagram.com/yahneyy",
    color: "text-(--ctp-pink)",
    bgColor: "bg-(--ctp-pink)/10",
    borderColor: "border-(--ctp-pink)/20",
    hoverBg: "hover:bg-(--ctp-pink)/15",
  },
];

/* ═══════════════════════════════════════════════════════════
   DESIGN 1 — Original Clean Vertical
   ═══════════════════════════════════════════════════════════ */
function Design1() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Contact
        </h1>
        <p className="text-sm text-muted-foreground">
          Feel free to reach out for new projects, ideas, or opportunities.
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="size-3.5" />
        <span>Quezon City, Philippines</span>
      </div>

      <div className="h-px bg-border" />

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Documents
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          {resumeLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary"
            >
              <div className="flex items-center gap-3">
                <link.icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {link.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {link.description}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      <div className="h-px bg-border" />

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Connect
        </h2>
        <div className="flex flex-col">
          {contactLinks.map((contact) => (
            <Link
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                contact.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group -mx-3 flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-muted"
            >
              <contact.icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              <span className="w-20 shrink-0 text-sm font-medium text-foreground">
                {contact.label}
              </span>
              <span className="truncate text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                {contact.value}
              </span>
              <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 2 — Colorful Card Grid
   Each contact as an individual card with Catppuccin accent colors
   ═══════════════════════════════════════════════════════════ */
function Design2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Get in Touch
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          <span>Quezon City, Philippines</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {contactLinks.map((contact) => (
          <Link
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("mailto") ? undefined : "_blank"}
            rel={
              contact.href.startsWith("mailto")
                ? undefined
                : "noopener noreferrer"
            }
            className={`group relative overflow-hidden rounded-xl border ${contact.borderColor} ${contact.bgColor} p-5 transition-all duration-300 ${contact.hoverBg} hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${contact.bgColor} ${contact.color}`}
              >
                <contact.icon className="size-5" />
              </div>
              <ArrowUpRight
                className={`size-4 ${contact.color} opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100`}
              />
            </div>
            <div className="mt-4">
              <p className={`text-sm font-semibold ${contact.color}`}>
                {contact.label}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {contact.value}
              </p>
            </div>
          </Link>
        ))}

        {/* Documents in the grid */}
        {resumeLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-(--ctp-yellow)/20 bg-(--ctp-yellow)/10 p-5 transition-all duration-300 hover:bg-(--ctp-yellow)/15 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex size-10 items-center justify-center rounded-lg bg-(--ctp-yellow)/10 text-(--ctp-yellow)">
                <link.icon className="size-5" />
              </div>
              <ArrowUpRight className="size-4 text-(--ctp-yellow) opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-(--ctp-yellow)">
                {link.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 3 — Terminal / CLI Aesthetic
   Monospace, command-line inspired layout
   ═══════════════════════════════════════════════════════════ */
function Design3() {
  return (
    <div className="flex flex-col gap-4">
      {/* Terminal window chrome */}
      <div className="overflow-hidden rounded-lg border border-border bg-[#181825]">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border bg-[#11111b] px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-(--ctp-red)" />
            <div className="size-3 rounded-full bg-(--ctp-yellow)" />
            <div className="size-3 rounded-full bg-(--ctp-green)" />
          </div>
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            yanicells@arch ~ contact
          </span>
        </div>

        {/* Terminal body */}
        <div className="space-y-3 p-5 font-mono text-sm">
          {/* whoami */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-(--ctp-green)">➜</span>
              <span className="text-(--ctp-blue)">~</span>
              <span className="text-foreground">whoami</span>
            </div>
            <p className="ml-6 text-muted-foreground">
              Edrian Miguel E. Capistrano (Yanicells)
            </p>
          </div>

          {/* location */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-(--ctp-green)">➜</span>
              <span className="text-(--ctp-blue)">~</span>
              <span className="text-foreground">echo $LOCATION</span>
            </div>
            <p className="ml-6 text-muted-foreground">
              Quezon City, Philippines
            </p>
          </div>

          {/* cat contacts */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-(--ctp-green)">➜</span>
              <span className="text-(--ctp-blue)">~</span>
              <span className="text-foreground">cat ./contacts.json</span>
            </div>
            <div className="ml-6 mt-1 space-y-1">
              <span className="text-muted-foreground">{"{"}</span>
              {contactLinks.map((contact, i) => (
                <div key={contact.label} className="ml-4">
                  <span className="text-(--ctp-blue)">
                    &quot;{contact.label.toLowerCase()}&quot;
                  </span>
                  <span className="text-muted-foreground">: </span>
                  <Link
                    href={contact.href}
                    target={
                      contact.href.startsWith("mailto") ? undefined : "_blank"
                    }
                    rel={
                      contact.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="text-(--ctp-green) underline decoration-(--ctp-green)/30 underline-offset-2 transition-colors hover:text-(--ctp-green) hover:decoration-(--ctp-green)"
                  >
                    &quot;{contact.value}&quot;
                  </Link>
                  {i < contactLinks.length - 1 && (
                    <span className="text-muted-foreground">,</span>
                  )}
                </div>
              ))}
              <span className="text-muted-foreground">{"}"}</span>
            </div>
          </div>

          {/* ls documents */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-(--ctp-green)">➜</span>
              <span className="text-(--ctp-blue)">~</span>
              <span className="text-foreground">ls ./documents/</span>
            </div>
            <div className="ml-6 mt-1 flex gap-6">
              {resumeLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--ctp-lavender) underline decoration-(--ctp-lavender)/30 underline-offset-2 transition-colors hover:decoration-(--ctp-lavender)"
                >
                  {link.label.toLowerCase()}.pdf
                </Link>
              ))}
            </div>
          </div>

          {/* Blinking cursor */}
          <div className="flex items-center gap-2">
            <span className="text-(--ctp-green)">➜</span>
            <span className="text-(--ctp-blue)">~</span>
            <span className="inline-block h-4.5 w-2 animate-pulse bg-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 4 — Bento Grid
   Asymmetric, magazine-style bento box layout
   ═══════════════════════════════════════════════════════════ */
function Design4() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        Contact
      </h1>

      <div className="grid auto-rows-[minmax(120px,auto)] grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Large email card — spans 2 cols */}
        <Link
          href={contactLinks[0].href}
          className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-linear-to-br from-(--ctp-red)/8 to-transparent p-6 transition-all duration-300 hover:border-(--ctp-red)/40 hover:shadow-lg hover:shadow-(--ctp-red)/5 sm:col-span-2"
        >
          <Mail className="size-6 text-(--ctp-red) transition-transform duration-300 group-hover:scale-110" />
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Email
            </p>
            <p className="mt-1 truncate text-base font-semibold text-foreground sm:text-lg">
              {contactLinks[0].value}
            </p>
          </div>
          <ArrowUpRight className="absolute right-4 top-4 size-4 text-muted-foreground/0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--ctp-red)" />
        </Link>

        {/* Location card */}
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-linear-to-br from-(--ctp-teal)/8 to-transparent p-6">
          <MapPin className="size-6 text-(--ctp-teal)" />
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Location
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              Quezon City, PH
            </p>
          </div>
        </div>

        {/* GitHub */}
        <Link
          href={contactLinks[2].href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col justify-between rounded-2xl border border-border bg-linear-to-br from-(--ctp-purple)/8 to-transparent p-6 transition-all duration-300 hover:border-(--ctp-purple)/40 hover:shadow-lg hover:shadow-(--ctp-purple)/5"
        >
          <Github className="size-6 text-(--ctp-purple) transition-transform duration-300 group-hover:scale-110" />
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              GitHub
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              yanicells
            </p>
          </div>
          <ArrowUpRight className="absolute right-4 top-4 size-4 text-muted-foreground/0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--ctp-purple)" />
        </Link>

        {/* LinkedIn — spans 2 cols */}
        <Link
          href={contactLinks[1].href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-linear-to-br from-(--ctp-blue)/8 to-transparent p-6 transition-all duration-300 hover:border-(--ctp-blue)/40 hover:shadow-lg hover:shadow-(--ctp-blue)/5 sm:col-span-2"
        >
          <Linkedin className="size-6 text-(--ctp-blue) transition-transform duration-300 group-hover:scale-110" />
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              LinkedIn
            </p>
            <p className="mt-1 text-base font-semibold text-foreground sm:text-lg">
              yanicells
            </p>
          </div>
          <ArrowUpRight className="absolute right-4 top-4 size-4 text-muted-foreground/0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--ctp-blue)" />
        </Link>

        {/* Socials row */}
        {[contactLinks[3], contactLinks[4]].map((contact) => (
          <Link
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col justify-between rounded-2xl border border-border bg-linear-to-br ${contact.label === "Facebook" ? "from-(--ctp-teal)/8" : "from-(--ctp-pink)/8"} to-transparent p-6 transition-all duration-300 hover:border-${contact.label === "Facebook" ? "(--ctp-teal)" : "(--ctp-pink)"}/40`}
          >
            <contact.icon
              className={`size-6 ${contact.color} transition-transform duration-300 group-hover:scale-110`}
            />
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {contact.label}
              </p>
              <p className="mt-1 truncate text-base font-semibold text-foreground">
                {contact.value}
              </p>
            </div>
            <ArrowUpRight
              className={`absolute right-4 top-4 size-4 text-muted-foreground/0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:${contact.color}`}
            />
          </Link>
        ))}

        {/* Documents card — spans full or remaining */}
        <div className="col-span-1 flex flex-col justify-between rounded-2xl border border-border bg-linear-to-br from-(--ctp-yellow)/8 to-transparent p-6">
          <FileText className="size-6 text-(--ctp-yellow)" />
          <div className="mt-4 flex gap-4">
            {resumeLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-(--ctp-yellow)"
              >
                {link.label}
                <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 5 — Centered Minimal
   Ultra-clean, centered, with icon circle ring
   ═══════════════════════════════════════════════════════════ */
function Design5() {
  return (
    <div className="flex flex-col items-center gap-10 py-6 text-center">
      {/* Avatar area */}
      <div className="space-y-3">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-dashed border-border">
          <User className="size-7 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Edrian Miguel Capistrano
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Full-Stack Developer · Quezon City, PH
          </p>
        </div>
      </div>

      {/* Social icons row */}
      <div className="flex items-center gap-3">
        {contactLinks.map((contact) => (
          <Link
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("mailto") ? undefined : "_blank"}
            rel={
              contact.href.startsWith("mailto")
                ? undefined
                : "noopener noreferrer"
            }
            className={`group flex size-12 items-center justify-center rounded-full border border-border transition-all duration-300 hover:scale-110 ${contact.hoverBg} hover:${contact.borderColor}`}
            title={contact.label}
          >
            <contact.icon
              className={`size-5 text-muted-foreground transition-colors duration-300 group-hover:${contact.color}`}
            />
          </Link>
        ))}
      </div>

      {/* Email callout */}
      <div className="w-full max-w-md">
        <Link
          href={contactLinks[0].href}
          className="group flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-primary hover:text-foreground"
        >
          <Mail className="size-4" />
          <span>{contactLinks[0].value}</span>
          <Send className="size-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
        </Link>
      </div>

      {/* Separator */}
      <div className="flex w-full max-w-xs items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">documents</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Documents */}
      <div className="flex gap-4">
        {resumeLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-(--ctp-yellow) hover:text-(--ctp-yellow)"
          >
            <FileText className="size-3.5" />
            {link.label}
            <ExternalLink className="size-3 opacity-0 transition-all group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 6 — Large Typography / Editorial
   Big, bold text with a magazine-like feel
   ═══════════════════════════════════════════════════════════ */
function Design6() {
  return (
    <div className="flex flex-col gap-12">
      {/* Huge header */}
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--ctp-blue)">
          Say hello
        </p>
        <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          Let&apos;s work
          <br />
          <span className="bg-linear-to-r from-(--ctp-blue) via-(--ctp-purple) to-(--ctp-pink) bg-clip-text text-transparent">
            together.
          </span>
        </h1>
      </div>

      {/* Big email */}
      <div>
        <Link
          href={contactLinks[0].href}
          className="group inline-flex items-center gap-3 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-xl"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-(--ctp-red)/10">
            <Mail className="size-5 text-(--ctp-red)" />
          </div>
          <span className="border-b border-transparent transition-colors group-hover:border-foreground">
            {contactLinks[0].value}
          </span>
        </Link>
      </div>

      {/* Three-column links */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {/* Socials */}
        <div className="space-y-4">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Social
          </h2>
          <div className="space-y-3">
            {contactLinks.slice(1).map((contact) => (
              <Link
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
              >
                <ChevronRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                {contact.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Documents
          </h2>
          <div className="space-y-3">
            {resumeLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-foreground transition-colors hover:text-(--ctp-yellow)"
              >
                <ChevronRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Based in
          </h2>
          <div className="flex items-start gap-2 text-sm text-foreground">
            <Globe className="mt-0.5 size-3.5 text-(--ctp-teal)" />
            <div>
              <p>Quezon City</p>
              <p className="text-muted-foreground">Philippines</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-linear-to-r from-(--ctp-blue) via-(--ctp-purple) to-transparent" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 7 — Two-Column Split
   Left side info/title, right side links
   ═══════════════════════════════════════════════════════════ */
function Design7() {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
      {/* Left column — sticky info */}
      <div className="flex flex-col gap-4 sm:w-2/5 sm:sticky sm:top-24">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Contact
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of something great.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-3.5 text-(--ctp-teal)" />
          <span>Quezon City, Philippines</span>
        </div>

        {/* Quick icons */}
        <div className="mt-2 flex gap-2">
          {contactLinks.map((contact) => (
            <Link
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                contact.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-all hover:border-primary hover:text-foreground"
              title={contact.label}
            >
              <contact.icon className="size-3.5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Right column — detailed links */}
      <div className="flex flex-1 flex-col gap-2">
        {contactLinks.map((contact) => (
          <Link
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("mailto") ? undefined : "_blank"}
            rel={
              contact.href.startsWith("mailto")
                ? undefined
                : "noopener noreferrer"
            }
            className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
          >
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${contact.bgColor}`}
            >
              <contact.icon className={`size-4.5 ${contact.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                {contact.label}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {contact.value}
              </p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
          </Link>
        ))}

        <div className="my-2 h-px bg-border" />

        {resumeLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-(--ctp-yellow)/30 hover:bg-muted/50"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--ctp-yellow)/10">
              <link.icon className="size-4.5 text-(--ctp-yellow)" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                {link.label}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {link.description}
              </p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 8 — Horizontal Ticker / Compact List
   Tight, dense data-rich layout with hover reveals
   ═══════════════════════════════════════════════════════════ */
function Design8() {
  const allLinks = [
    ...contactLinks.map((c) => ({
      icon: c.icon,
      label: c.label,
      detail: c.value,
      href: c.href,
      color: c.color,
      bgColor: c.bgColor,
    })),
    ...resumeLinks.map((r) => ({
      icon: r.icon,
      label: r.label,
      detail: r.description,
      href: r.href,
      color: "text-(--ctp-yellow)",
      bgColor: "bg-(--ctp-yellow)/10",
    })),
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header with status badge */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Contact
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Open to new opportunities and collaborations.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-(--ctp-green)/20 bg-(--ctp-green)/5 px-3 py-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-(--ctp-green) opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-(--ctp-green)" />
          </span>
          <span className="text-xs font-medium text-(--ctp-green)">
            Available
          </span>
        </div>
      </div>

      {/* Compact list with number index */}
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
        {allLinks.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto") ? undefined : "_blank"}
            rel={
              item.href.startsWith("mailto") ? undefined : "noopener noreferrer"
            }
            className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/50"
          >
            {/* Index number */}
            <span className="w-5 font-mono text-xs text-muted-foreground/50">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Icon pill */}
            <div
              className={`flex size-8 items-center justify-center rounded-md ${item.bgColor}`}
            >
              <item.icon className={`size-3.5 ${item.color}`} />
            </div>

            {/* Label */}
            <span className="w-20 shrink-0 text-sm font-semibold text-foreground">
              {item.label}
            </span>

            {/* Detail */}
            <span className="flex-1 truncate text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              {item.detail}
            </span>

            {/* Arrow */}
            <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
          </Link>
        ))}
      </div>

      {/* Location footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="size-3" />
          Quezon City, Philippines
        </div>
        <span className="font-mono">UTC+8</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 9 — Two-Column Split w/ Paired Rows
   Based on Design 7 but GitHub+LinkedIn and FB+IG share rows
   ═══════════════════════════════════════════════════════════ */
function Design9() {
  const email = contactLinks[0];
  const devPair = [contactLinks[1], contactLinks[2]]; // LinkedIn, GitHub
  const socialPair = [contactLinks[3], contactLinks[4]]; // Facebook, Instagram

  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
      {/* Left column — sticky info */}
      <div className="flex flex-col gap-4 sm:w-2/5 sm:sticky sm:top-24">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Contact
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of something great.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-3.5 text-(--ctp-teal)" />
          <span>Quezon City, Philippines</span>
        </div>

        {/* Quick icons */}
        <div className="mt-2 flex gap-2">
          {contactLinks.map((contact) => (
            <Link
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                contact.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-all hover:border-primary hover:text-foreground"
              title={contact.label}
            >
              <contact.icon className="size-3.5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Right column — paired link cards */}
      <div className="flex flex-1 flex-col gap-2">
        {/* Email — full width */}
        <Link
          href={email.href}
          className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
        >
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${email.bgColor}`}
          >
            <email.icon className={`size-4.5 ${email.color}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{email.label}</p>
            <p className="truncate text-xs text-muted-foreground">
              {email.value}
            </p>
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
        </Link>

        {/* LinkedIn + GitHub row */}
        <div className="grid grid-cols-2 gap-2">
          {devPair.map((contact) => (
            <Link
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${contact.bgColor}`}
              >
                <contact.icon className={`size-4 ${contact.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {contact.label}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {contact.value}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Facebook + Instagram row */}
        <div className="grid grid-cols-2 gap-2">
          {socialPair.map((contact) => (
            <Link
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${contact.bgColor}`}
              >
                <contact.icon className={`size-4 ${contact.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {contact.label}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {contact.value}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="my-2 h-px bg-border" />

        {/* Resume + CV row */}
        <div className="grid grid-cols-2 gap-2">
          {resumeLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-all duration-200 hover:border-(--ctp-yellow)/30 hover:bg-muted/50"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-(--ctp-yellow)/10">
                <link.icon className="size-4 text-(--ctp-yellow)" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {link.label}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 10 — Brutalist Split
   Two-column with raw, unpolished edges + heavy borders
   ═══════════════════════════════════════════════════════════ */
function Design10() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-xl border-2 border-foreground/20 sm:flex-row">
      {/* Left — dark slab */}
      <div className="flex flex-col justify-between gap-6 border-b-2 border-foreground/20 bg-muted/80 p-8 sm:w-2/5 sm:border-b-0 sm:border-r-2">
        <div className="space-y-4">
          <h1 className="font-mono text-3xl font-black uppercase tracking-tighter text-foreground">
            Contact
            <span className="text-(--ctp-red)">.</span>
          </h1>
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            Full-Stack Developer
            <br />
            Quezon City, PH
            <br />
            UTC+8
          </p>
        </div>
        <div className="flex gap-3">
          {contactLinks.map((contact) => (
            <Link
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                contact.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className={`flex size-9 items-center justify-center border-2 border-foreground/15 transition-all hover:-translate-y-0.5 hover:border-foreground/40 ${contact.color}`}
              title={contact.label}
            >
              <contact.icon className="size-4" />
            </Link>
          ))}
        </div>
      </div>

      {/* Right — stacked blocks */}
      <div className="flex flex-1 flex-col divide-y-2 divide-foreground/10">
        {contactLinks.map((contact) => (
          <Link
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("mailto") ? undefined : "_blank"}
            rel={
              contact.href.startsWith("mailto")
                ? undefined
                : "noopener noreferrer"
            }
            className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-foreground/5"
          >
            <span
              className={`font-mono text-[10px] font-black uppercase tracking-widest ${contact.color}`}
            >
              {contact.label}
            </span>
            <span className="flex-1 truncate text-right font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              {contact.value}
            </span>
            <ArrowUpRight className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60" />
          </Link>
        ))}

        {/* Documents block */}
        <div className="flex items-center gap-4 px-6 py-4">
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-(--ctp-yellow)">
            Docs
          </span>
          <div className="flex flex-1 justify-end gap-3">
            {resumeLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-dashed border-muted-foreground/40 font-mono text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 11 — Glassmorphism Split
   Two-column with frosted glass cards and soft glows
   ═══════════════════════════════════════════════════════════ */
function Design11() {
  return (
    <div className="relative flex flex-col gap-8 sm:flex-row sm:gap-10">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-(--ctp-blue)/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 size-60 rounded-full bg-(--ctp-pink)/8 blur-3xl" />

      {/* Left column — glass panel */}
      <div className="relative flex flex-col gap-5 rounded-2xl border border-foreground/8 bg-foreground/3 p-7 backdrop-blur-sm sm:w-2/5">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-widest text-(--ctp-blue)">
            Contact
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            Let&apos;s connect
          </h1>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Available for freelance work, collaborations, and interesting
          conversations about tech.
        </p>
        <div className="mt-auto flex items-center gap-2 rounded-lg border border-foreground/5 bg-foreground/2 px-3 py-2 text-sm text-muted-foreground">
          <MapPin className="size-3.5 text-(--ctp-teal)" />
          Quezon City, Philippines
        </div>
      </div>

      {/* Right column — glass link cards */}
      <div className="relative flex flex-1 flex-col gap-2.5">
        {contactLinks.map((contact) => (
          <Link
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("mailto") ? undefined : "_blank"}
            rel={
              contact.href.startsWith("mailto")
                ? undefined
                : "noopener noreferrer"
            }
            className="group flex items-center gap-4 rounded-xl border border-foreground/8 bg-foreground/3 p-4 backdrop-blur-sm transition-all duration-300 hover:border-foreground/15 hover:bg-foreground/6 hover:shadow-lg hover:shadow-foreground/5"
          >
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-full ${contact.bgColor} ring-1 ring-foreground/5`}
            >
              <contact.icon className={`size-4 ${contact.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                {contact.label}
              </p>
              <p className="truncate text-xs text-muted-foreground/70">
                {contact.value}
              </p>
            </div>
            <div className="flex size-7 items-center justify-center rounded-full bg-foreground/5 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            </div>
          </Link>
        ))}

        {/* Documents row */}
        <div className="mt-1 grid grid-cols-2 gap-2.5">
          {resumeLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-foreground/8 bg-foreground/3 p-4 backdrop-blur-sm transition-all duration-300 hover:border-foreground/15 hover:bg-foreground/6"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--ctp-yellow)/10 ring-1 ring-foreground/5">
                <link.icon className="size-3.5 text-(--ctp-yellow)" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {link.label}
                </p>
                <p className="text-[11px] text-muted-foreground/70">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 12 — Sidebar Nav Style
   Left column as a navigation sidebar, right as expanded content
   ═══════════════════════════════════════════════════════════ */
function Design12() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-2xl border border-border sm:flex-row">
      {/* Left sidebar */}
      <div className="flex flex-col gap-6 border-b border-border bg-muted/30 px-6 py-7 sm:w-56 sm:border-b-0 sm:border-r">
        <div className="space-y-1">
          <h1 className="text-lg font-bold text-foreground">Contact</h1>
          <p className="text-xs text-muted-foreground">Reach out anytime</p>
        </div>

        <div className="space-y-1">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Quick links
          </p>
          {contactLinks.map((contact) => (
            <Link
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                contact.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-muted`}
            >
              <contact.icon
                className={`size-3.5 text-muted-foreground transition-colors group-hover:${contact.color}`}
              />
              <span className="text-foreground/80 transition-colors group-hover:text-foreground">
                {contact.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
          <MapPin className="size-3" />
          QC, Philippines
        </div>
      </div>

      {/* Right content area */}
      <div className="flex flex-1 flex-col gap-6 p-7">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-foreground">
            Edrian Miguel E. Capistrano
          </h2>
          <p className="text-xs text-muted-foreground">
            Full-Stack Developer · Open to new work
          </p>
        </div>

        {/* Primary contact — email */}
        <Link
          href={contactLinks[0].href}
          className="group flex items-center gap-4 rounded-xl bg-muted/40 p-4 transition-colors hover:bg-muted/70"
        >
          <div className="flex size-11 items-center justify-center rounded-lg bg-(--ctp-red)/10">
            <Mail className="size-5 text-(--ctp-red)" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Email
            </p>
            <p className="mt-0.5 truncate text-sm font-medium text-foreground">
              {contactLinks[0].value}
            </p>
          </div>
          <Send className="size-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
        </Link>

        {/* Dev + Social paired */}
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Developer profiles
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[contactLinks[1], contactLinks[2]].map((contact) => (
              <Link
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg bg-muted/40 p-3 transition-colors hover:bg-muted/70"
              >
                <contact.icon className={`size-4 ${contact.color}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {contact.label}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {contact.value}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Social
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[contactLinks[3], contactLinks[4]].map((contact) => (
              <Link
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg bg-muted/40 p-3 transition-colors hover:bg-muted/70"
              >
                <contact.icon className={`size-4 ${contact.color}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {contact.label}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {contact.value}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Documents at bottom */}
        <div className="mt-auto flex gap-3 border-t border-border pt-5">
          {resumeLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-lg border border-dashed border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-(--ctp-yellow)/40 hover:text-(--ctp-yellow)"
            >
              <FileText className="size-3.5" />
              {link.label}
              <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DESIGN 13 — Profile Card + Paired Rows
   Header/desc on top, profile card + paired contact grid below
   ═══════════════════════════════════════════════════════════ */
function Design13() {
  const email = contactLinks[0];
  const devPair = [contactLinks[1], contactLinks[2]];
  const socialPair = [contactLinks[3], contactLinks[4]];

  return (
    <div className="flex flex-col gap-6">
      {/* Top header — outside the two columns, like Design 1 */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Contact
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of something great.
        </p>
      </div>

      <div className="h-px bg-border" />

      {/* Two-column body */}
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
        {/* Left — profile card */}
        <div className="flex flex-col items-center gap-4 sm:w-2/5">
          <div className="relative size-24 overflow-hidden rounded-2xl ring-2 ring-border ring-offset-2 ring-offset-background">
            <Image
              src="/yani.png"
              alt="Yanicells"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-foreground">
              Edrian Miguel Capistrano
            </h2>
            <p className="text-xs text-muted-foreground">
              Full-Stack Developer
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <MapPin className="size-3 text-(--ctp-teal)" />
            Quezon City, Philippines
          </div>

          {/* Quick icon row */}
          <div className="flex gap-2">
            {contactLinks.map((contact) => (
              <Link
                key={contact.label}
                href={contact.href}
                target={
                  contact.href.startsWith("mailto") ? undefined : "_blank"
                }
                rel={
                  contact.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={`flex size-8 items-center justify-center rounded-full ${contact.bgColor} transition-all hover:scale-110`}
                title={contact.label}
              >
                <contact.icon className={`size-3.5 ${contact.color}`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Right — contact links */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Email — full width */}
          <Link
            href={email.href}
            className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
          >
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${email.bgColor}`}
            >
              <email.icon className={`size-4.5 ${email.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                {email.label}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {email.value}
              </p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
          </Link>

          {/* LinkedIn + GitHub row */}
          <div className="grid grid-cols-2 gap-2">
            {devPair.map((contact) => (
              <Link
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
              >
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${contact.bgColor}`}
                >
                  <contact.icon className={`size-4 ${contact.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {contact.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {contact.value}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Facebook + Instagram row */}
          <div className="grid grid-cols-2 gap-2">
            {socialPair.map((contact) => (
              <Link
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
              >
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${contact.bgColor}`}
                >
                  <contact.icon className={`size-4 ${contact.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {contact.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {contact.value}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="my-2 h-px bg-border" />

          {/* Resume — full width */}
          <Link
            href={resumeLinks[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-(--ctp-yellow)/30 hover:bg-muted/50"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--ctp-yellow)/10">
              <FileText className="size-4.5 text-(--ctp-yellow)" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                {resumeLinks[0].label}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {resumeLinks[0].description}
              </p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
          </Link>

          {/* CV — full width */}
          <Link
            href={resumeLinks[1].href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-(--ctp-yellow)/30 hover:bg-muted/50"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--ctp-yellow)/10">
              <FileText className="size-4.5 text-(--ctp-yellow)" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                {resumeLinks[1].label}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {resumeLinks[1].description}
              </p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT — Renders all 13 designs sequentially
   ═══════════════════════════════════════════════════════════ */
export function ContactInfo() {
  const designs = [
    { num: 1, label: "Clean Vertical", component: <Design1 /> },
    { num: 2, label: "Colorful Card Grid", component: <Design2 /> },
    { num: 3, label: "Terminal / CLI", component: <Design3 /> },
    { num: 4, label: "Bento Grid", component: <Design4 /> },
    { num: 5, label: "Centered Minimal", component: <Design5 /> },
    { num: 6, label: "Editorial / Large Type", component: <Design6 /> },
    { num: 7, label: "Two-Column Split", component: <Design7 /> },
    { num: 8, label: "Compact Indexed List", component: <Design8 /> },
    { num: 9, label: "Two-Column Paired Rows", component: <Design9 /> },
    { num: 10, label: "Brutalist Split", component: <Design10 /> },
    { num: 11, label: "Glassmorphism Split", component: <Design11 /> },
    { num: 12, label: "Sidebar Nav Style", component: <Design12 /> },
    { num: 13, label: "Profile Card + Paired", component: <Design13 /> },
  ];

  return (
    <div className="flex flex-col gap-16">
      {designs.map((d, i) => (
        <div key={d.num}>
          {/* Design label */}
          <div className="mb-6 flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary">
              {d.num}
            </span>
            <h2 className="font-mono text-sm font-medium text-muted-foreground">
              {d.label}
            </h2>
          </div>

          {/* Design content */}
          {d.component}

          {/* Separator between designs */}
          {i < designs.length - 1 && (
            <div className="mt-16 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                next design
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
