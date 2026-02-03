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
import { Button } from "@/components/ui/button";
import { HelpDialog } from "@/components/shared/help-dialog";
import {
  Home,
  FolderKanban,
  User,
  Layers,
  Mail,
  Briefcase,
  PanelLeft,
} from "lucide-react";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "About Me", url: "/about", icon: User },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Experience", url: "/experience", icon: Briefcase },
  { title: "Tech Stack", url: "/tech-stack", icon: Layers },
  { title: "Contact", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        {state !== "collapsed" && (
          <Link href="/" className="block">
            <Image
              src="/logo.png"
              alt="yanicells"
              width={40}
              height={40}
              className="size-10 transition-transform hover:scale-105"
            />
          </Link>
        )}
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
