import Image from "next/image";
import Link from "next/link";

/**
 * Main header component with branding and profile image.
 * Shows on desktop, mobile has sidebar trigger in page-layout.
 */
export function MainHeader() {
  return (
    <header className="hidden h-14 items-center justify-between border-b border-border px-6 md:flex">
      {/* Branding */}
      <Link
        href="/"
        className="font-mono text-lg text-primary transition-colors hover:text-(--ctp-blue-hover)"
      >
        &lt;yanicells /&gt;
      </Link>

      {/* Profile */}
      <Link
        href="/about"
        className="relative size-8 overflow-hidden rounded-full ring-2 ring-border transition-all hover:ring-primary"
      >
        <Image src="/profile.jpg" alt="Profile" fill className="object-cover" />
      </Link>
    </header>
  );
}
