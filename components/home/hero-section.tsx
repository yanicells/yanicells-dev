import Image from "next/image";
import Link from "next/link";
import { Mail, Linkedin, Github, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    icon: Mail,
    href: "mailto:edrianmiguelcapistrano@gmail.com",
    label: "Email",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/yanicells",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/yanicells",
    label: "GitHub",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/edrian.capistrano.9",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/yahneyy",
    label: "Instagram",
  },
];

export function HeroSection() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-12">
      <div className="flex w-full max-w-6xl flex-col-reverse items-center gap-8 sm:gap-12 lg:flex-row lg:justify-between">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Greeting */}
          <p className="mb-2 font-sans text-lg italic text-primary">
            Halo halo! I&apos;m
          </p>

          {/* Name */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Edrian Miguel E.
            <br />
            Capistrano
          </h1>

          {/* Title */}
          <p className="mb-2 text-xl text-muted-foreground">
            Full-Stack Web Developer
          </p>

          {/* Tagline */}
          <p className="mb-6 font-mono text-sm text-muted-foreground">
            <span className="line-through">Vibe</span> Aura Coder | ADMU 2 BS CS
          </p>

          {/* Buttons */}
          <div className="mb-8 flex gap-4">
            <Button
              asChild
              variant="outline"
              className="border-border bg-transparent px-6 hover:bg-accent hover:text-accent-foreground"
            >
              <Link
                href="https://resume.yanicells.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border bg-transparent px-6 hover:bg-accent hover:text-accent-foreground"
            >
              <Link
                href="https://cv.yanicells.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                CV
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-colors hover:text-primary"
                aria-label={social.label}
              >
                <social.icon className="size-6" />
              </Link>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative">
          <div className="relative size-48 overflow-hidden rounded-full border-4 border-border sm:size-64 lg:size-80">
            <Image
              src="/profile.jpg"
              alt="Edrian Miguel E. Capistrano"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative ring */}
          <div className="absolute -inset-2 -z-10 rounded-full border border-border/50" />
        </div>
      </div>
    </section>
  );
}
