import Link from "next/link";
import {
  Mail,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  MapPin,
  FileText,
  ExternalLink,
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
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Contact
        </h1>
        <p className="text-sm text-muted-foreground">
          Feel free to reach out for new projects, ideas, or opportunities.
        </p>
      </div>

      {/* Resume & CV - Featured */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Resume & CV</h2>
          <p className="text-sm text-muted-foreground">
            View my professional documents
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {resumeLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary"
            >
              <div className="relative flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted">
                <link.icon className="size-7 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground">{link.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
              </div>
              <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </section>

      {/* Location */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Location</h2>
          <p className="text-sm text-muted-foreground">Based in</p>
        </div>

        <div className="flex items-center gap-4 rounded-lg p-3">
          <MapPin className="size-5 text-muted-foreground" />
          <span className="text-foreground">Quezon City, Philippines</span>
        </div>
      </section>

      {/* Contact Links */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Get in Touch</h2>
          <p className="text-sm text-muted-foreground">
            Connect with me on these platforms
          </p>
        </div>

        <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
          {contactLinks.map((contact, idx) => (
            <Link
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                contact.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
            >
              <span className="w-4 shrink-0 text-sm text-muted-foreground">
                {idx + 1}
              </span>
              <div className="text-muted-foreground transition-colors group-hover:text-foreground">
                <contact.icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{contact.label}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {contact.value}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
