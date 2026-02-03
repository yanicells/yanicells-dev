import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/home/app-sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * Shared layout component for all pages with sidebar and mobile header.
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b border-border px-4 md:hidden">
          <SidebarTrigger />
          <span className="font-mono text-sm text-primary">
            &lt;yanicells /&gt;
          </span>
        </header>
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
