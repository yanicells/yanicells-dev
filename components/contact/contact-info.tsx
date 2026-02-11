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
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "yanicells",
    href: "https://www.linkedin.com/in/yanicells",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "yanicells",
    href: "https://github.com/yanicells",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Edrian Capistrano",
    href: "https://www.facebook.com/edrian.capistrano.9",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@yahneyy",
    href: "https://www.instagram.com/yahneyy",
  },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Contact
        </h1>
        <p className="text-sm text-muted-foreground">
          Feel free to reach out for new projects, ideas, or opportunities.
        </p>
      </div>

      {/* Location - clean inline */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="size-3.5" />
        <span>Quezon City, Philippines</span>
      </div>

      <div className="h-px bg-border" />

      {/* Resume & CV */}
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

      {/* Contact Links */}
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
