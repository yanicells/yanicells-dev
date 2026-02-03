"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Settings } from "lucide-react";

/**
 * Help dialog component for the sidebar footer.
 */
export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton tooltip="Help" className="hover:bg-sidebar-accent">
          <Settings className="size-4" />
          <span>Help</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Help & Information</DialogTitle>
          <DialogDescription>
            Welcome to my portfolio website!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h4 className="mb-2 font-semibold text-foreground">Navigation</h4>
            <p className="text-sm text-muted-foreground">
              Use the sidebar to navigate between pages. Click the collapse
              button to minimize the sidebar.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Feel free to reach out via the Contact page or connect with me on
              social media.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-foreground">Built With</h4>
            <p className="text-sm text-muted-foreground">
              Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
