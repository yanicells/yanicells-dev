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
  /** If true, children will span full width without max-w constraint */
  fullWidth?: boolean;
}

/**
 * Shared layout component for all pages with sidebar and headers.
 */
export function PageLayout({ children, fullWidth = false }: PageLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="overflow-auto">
        {/* Mobile header */}
        <div className="sticky top-0 z-50 bg-background md:hidden">
          <header className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="" />
              <span className="font-mono text-lg font-bold">
                &lt;yanicells / &gt;
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
        </div>

        {/* Desktop header */}
        <div className="sticky top-0 z-50 hidden bg-background md:block">
          <MainHeader />
        </div>

        <main className="min-h-0 flex-1">
          {fullWidth ? (
            children
          ) : (
            <div className="mx-auto w-full max-w-4xl px-6 py-8">{children}</div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
