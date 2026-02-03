"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

/**
 * Sidebar collapse trigger button.
 */
export function SidebarCollapseTrigger() {
  const { state, toggleSidebar } = useSidebar();

  if (state === "collapsed") {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="size-8 text-sidebar-foreground hover:bg-sidebar-accent"
    >
      <PanelLeft className="size-4" />
      <span className="sr-only">Collapse sidebar</span>
    </Button>
  );
}
