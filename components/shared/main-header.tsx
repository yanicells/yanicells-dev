import Image from "next/image";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";

/**
 * Main header component with branding and profile image.
 * Shows on desktop, mobile has sidebar trigger in page-layout.
 */
export function MainHeader() {
  return (
    <header className="flex h-14 items-center justify-between px-4 transition-all duration-300 ease-linear md:px-6">
      <div className="flex items-center gap-2">
        {/* Removed SidebarTrigger from here to avoid duplicate if using collapsible="icon" */}
        {/* Branding */}
        <Link
          href="/"
          className="font-mono text-lg text-white transition-colors hover:text-white/80"
        >
          &lt;yanicells /&gt;
        </Link>
      </div>

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
