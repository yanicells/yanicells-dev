"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Home,
  FolderKanban,
  User,
  Layers,
  Mail,
  Briefcase,
  Settings,
  PanelLeft,
} from "lucide-react";

const navItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About Me",
    url: "/about",
    icon: User,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Experience",
    url: "/experience",
    icon: Briefcase,
  },
  {
    title: "Tech Stack",
    url: "/tech-stack",
    icon: Layers,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Mail,
  },
];

function SidebarLogo() {
  const { state } = useSidebar();

  if (state === "collapsed") {
    return null;
  }

  return (
    <Link href="/" className="block">
      <Image
        src="/logo.png"
        alt="yanicells"
        width={40}
        height={40}
        className="size-10 transition-transform hover:scale-105"
      />
    </Link>
  );
}

function CollapseTrigger() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="size-8 text-sidebar-foreground hover:bg-sidebar-accent"
    >
      <PanelLeft className="size-4" />
      <span className="sr-only">
        {state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"}
      </span>
    </Button>
  );
}

function HelpDialog() {
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

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <SidebarLogo />
        <CollapseTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="hover:bg-sidebar-accent"
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <HelpDialog />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
