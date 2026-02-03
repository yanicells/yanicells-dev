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
    <section className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
      <div className="flex w-full max-w-7xl flex-col-reverse items-center gap-10 sm:gap-16 lg:flex-row lg:justify-between lg:gap-20">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Greeting */}
          <p className="mb-3 font-sans text-xl italic text-primary sm:text-2xl">
            Halo halo! I&apos;m
          </p>

          {/* Name */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
            Edrian Miguel E.
            <br />
            Capistrano
          </h1>

          {/* Title */}
          <p className="mb-3 text-2xl text-muted-foreground sm:text-3xl lg:text-4xl">
            Full-Stack Web Developer
          </p>

          {/* Tagline */}
          <p className="mb-8 font-mono text-base text-muted-foreground sm:text-lg lg:text-xl">
            <span className="line-through">Vibe</span> Aura Coder | ADMU 2 BS CS
          </p>

          {/* Buttons */}
          <div className="mb-10 flex gap-4 sm:gap-6">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border bg-transparent px-8 text-base transition-all hover:scale-105 hover:bg-accent hover:text-accent-foreground sm:px-10 sm:text-lg"
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
              size="lg"
              className="border-border bg-transparent px-8 text-base transition-all hover:scale-105 hover:bg-accent hover:text-accent-foreground sm:px-10 sm:text-lg"
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
          <div className="flex gap-5 sm:gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-all hover:scale-110 hover:text-primary"
                aria-label={social.label}
              >
                <social.icon className="size-7 sm:size-8 lg:size-9" />
              </Link>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative">
          <div className="relative size-56 overflow-hidden rounded-full border-4 border-border transition-all hover:border-primary sm:size-72 lg:size-96 xl:size-[28rem]">
            <Image
              src="/profile.jpg"
              alt="Edrian Miguel E. Capistrano"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative ring */}
          <div className="absolute -inset-3 -z-10 rounded-full border border-border/50 sm:-inset-4" />
        </div>
      </div>
    </section>
  );
}
