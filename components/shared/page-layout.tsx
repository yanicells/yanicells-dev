import Image from "next/image";
import Link from "next/link";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/home/app-sidebar";
import { MainHeader } from "@/components/shared/main-header";

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * Shared layout component for all pages with sidebar and headers.
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        {/* Mobile header */}
        <header className="flex h-14 items-center justify-between border-b border-border px-4 md:hidden">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="font-mono text-sm text-primary">
              &lt;yanicells /&gt;
            </span>
          </div>
          <Link
            href="/about"
            className="relative size-8 overflow-hidden rounded-full ring-2 ring-border"
          >
            <Image
              src="/profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </Link>
        </header>
        {/* Desktop header */}
        <MainHeader />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
