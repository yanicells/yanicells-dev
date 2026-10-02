import Link from "next/link";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { HeaderFrame } from "@/components/portfolio/header-frame";

export function SiteHeader({ opening = false }: { opening?: boolean }) {
  return (
    <HeaderFrame opening={opening}>
      <Link href="/" className="wordmark" aria-label="Yani Capistrano, home">
        yanicells
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <ThemeToggle />
    </HeaderFrame>
  );
}
