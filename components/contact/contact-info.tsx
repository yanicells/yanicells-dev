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
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

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
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "yanicells",
    href: "https://www.linkedin.com/in/yanicells",
    color: "text-(--ctp-blue)",
    bgColor: "bg-(--ctp-blue)/10",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "yanicells",
    href: "https://github.com/yanicells",
    color: "text-(--ctp-purple)",
    bgColor: "bg-(--ctp-purple)/10",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Edrian Capistrano",
    href: "https://www.facebook.com/edrian.capistrano.9",
    color: "text-(--ctp-teal)",
    bgColor: "bg-(--ctp-teal)/10",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@yahneyy",
    href: "https://www.instagram.com/yahneyy",
    color: "text-(--ctp-pink)",
    bgColor: "bg-(--ctp-pink)/10",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ContactCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  color: string;
  bgColor: string;
  className?: string;
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  color,
  bgColor,
  className = "",
}: ContactCardProps) {
  const isMailto = href.startsWith("mailto");
  return (
    <Link
      href={href}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      className={`group flex items-center gap-3 rounded-xl border border-border p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50 ${className}`}
    >
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${bgColor}`}
      >
        <Icon className={`size-4 ${color}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{value}</p>
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
    </Link>
  );
}

interface ResumeCardProps {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
}

function ResumeCard({ icon: Icon, label, description, href }: ResumeCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-200 hover:border-(--ctp-yellow)/30 hover:bg-muted/50"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--ctp-yellow)/10">
        <Icon className="size-4.5 text-(--ctp-yellow)" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
    </Link>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ContactInfo() {
  const email = contactLinks[0];
  const devPair = [contactLinks[1], contactLinks[2]] as const;
  const socialPair = [contactLinks[3], contactLinks[4]] as const;

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header — matches /experience and /tech-stack style */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Contact
        </h1>
        <p className="text-sm text-muted-foreground">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of something great.
        </p>
      </div>

      {/* Two-column body */}
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
        {/* Left — profile card */}
        <div className="flex flex-col items-center gap-4 sm:w-2/5">
          <div className="relative size-full overflow-hidden rounded-2xl">
            {/* <Image
              src="/newgif.gif"
              alt="Yanicells"
              fill
              className="object-cover"
            /> */}
            <video
              controls={false}
              autoPlay
              loop
              muted
              playsInline
              width="100%"
            >
              <source src="avatar.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-foreground">
              Edrian Miguel Capistrano
            </h2>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <MapPin className="size-3 text-(--ctp-teal)" />
            Quezon City, Philippines
          </div>

          {/* Quick icon row */}
          <div className="flex gap-3">
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
          <p className="text-sm text-muted-foreground">Contact & Socials</p>
          {/* Email — full width */}
          <ContactCard
            icon={email.icon}
            label={email.label}
            value={email.value}
            href={email.href}
            color={email.color}
            bgColor={email.bgColor}
          />

          {/* LinkedIn + GitHub row */}
          <div className="grid grid-cols-2 gap-2">
            {devPair.map((contact) => (
              <ContactCard
                key={contact.label}
                icon={contact.icon}
                label={contact.label}
                value={contact.value}
                href={contact.href}
                color={contact.color}
                bgColor={contact.bgColor}
              />
            ))}
          </div>

          {/* Facebook + Instagram row */}
          <div className="grid grid-cols-2 gap-2">
            {socialPair.map((contact) => (
              <ContactCard
                key={contact.label}
                icon={contact.icon}
                label={contact.label}
                value={contact.value}
                href={contact.href}
                color={contact.color}
                bgColor={contact.bgColor}
              />
            ))}
          </div>

          <div className="my-2 h-px bg-border" />

          <p className="text-sm text-muted-foreground">
            Qualifications & Experience
          </p>

          {/* Resume + CV */}
          {resumeLinks.map((link) => (
            <ResumeCard
              key={link.label}
              icon={link.icon}
              label={link.label}
              description={link.description}
              href={link.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
