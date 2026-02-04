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
        {/* Mobile header - Simplified since MainHeader handles trigger now? 
            Actually, MainHeader is desktop only normally, but we can make it adaptable or keep Mobile separate.
            To match ChatGPT, desktop and mobile share similar trigger logic.
        */}
        <div className="md:hidden">
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
        <div className="hidden md:block">
          <MainHeader />
        </div>

        <main className="min-h-0 flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
