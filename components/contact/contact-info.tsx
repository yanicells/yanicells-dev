import Link from "next/link";
import {
  Mail,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "edrianmiguelcapistrano@gmail.com",
    href: "mailto:edrianmiguelcapistrano@gmail.com",
    color: "text-[var(--ctp-red)]",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "yanicells",
    href: "https://www.linkedin.com/in/yanicells",
    color: "text-[var(--ctp-blue)]",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "yanicells",
    href: "https://github.com/yanicells",
    color: "text-foreground",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Edrian Capistrano",
    href: "https://www.facebook.com/edrian.capistrano.9",
    color: "text-[var(--ctp-blue)]",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@yahneyy",
    href: "https://www.instagram.com/yahneyy",
    color: "text-[var(--ctp-pink)]",
  },
];

export function ContactInfo() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 lg:px-8">
      <h1 className="mb-4 text-center text-4xl font-bold text-foreground sm:text-5xl">
        Contact
      </h1>
      <p className="mb-12 text-center text-muted-foreground">
        Feel free to reach out! I&apos;m always open to discussing new projects,
        ideas, or opportunities.
      </p>

      {/* Location */}
      <div className="mb-8 flex items-center justify-center gap-2 text-muted-foreground">
        <MapPin className="size-5" />
        <span>Quezon City, Philippines</span>
      </div>

      {/* Contact Links */}
      <div className="space-y-4">
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
            className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-[var(--ctp-blue-hover)]"
          >
            <div className={`${contact.color}`}>
              <contact.icon className="size-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{contact.label}</p>
              <p className="font-medium text-foreground">{contact.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-[var(--ctp-blue-hover)]"
        >
          <Link
            href="https://resume.yanicells.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-border bg-transparent"
        >
          <Link
            href="https://cv.yanicells.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            View CV
          </Link>
        </Button>
      </div>
    </section>
  );
}
