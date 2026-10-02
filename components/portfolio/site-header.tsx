"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { HeaderFrame } from "@/components/portfolio/header-frame";

const navigation = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader({ opening = false }: { opening?: boolean }) {
  const pathname = usePathname();
  const links = navigation.map(({ label, href }) => (
    <Link
      href={href}
      key={href}
      aria-current={pathname.startsWith(href) ? "page" : undefined}
      onClick={() => document.getElementById("mobile-navigation")?.hidePopover()}
    >
      {label}
    </Link>
  ));

  return (
    <HeaderFrame opening={opening}>
      <Link href="/" className="wordmark" aria-label="Yani Capistrano, home">
        yanicells
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {links}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <button
          className="menu-toggle"
          type="button"
          popoverTarget="mobile-navigation"
        >
          Menu
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m4 6 4 4 4-4" />
          </svg>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        popover="auto"
      >
        {links}
      </nav>
    </HeaderFrame>
  );
}
