import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/home/app-sidebar";
import { HeroSection } from "@/components/home/hero-section";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b border-border px-4 md:hidden">
          <SidebarTrigger />
          <span className="font-mono text-sm text-primary">
            &lt;yanicells /&gt;
          </span>
        </header>
        <main className="flex-1">
          <HeroSection />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
