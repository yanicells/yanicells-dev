"use client";

import { useState } from "react";
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
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="flex flex-row items-center justify-between px-3 py-2">
        {isCollapsed ? (
          // Collapsed state: show logo, on hover show collapse icon
          <button
            type="button"
            onClick={toggleSidebar}
            onMouseEnter={() => setIsHeaderHovered(true)}
            onMouseLeave={() => setIsHeaderHovered(false)}
            className="relative flex size-8 items-center justify-center rounded-md transition-colors hover:bg-sidebar-accent"
            aria-label="Expand sidebar"
          >
            {isHeaderHovered ? (
              <PanelLeft className="size-5 text-sidebar-foreground" />
            ) : (
              <Image
                src="/logo.png"
                alt="yanicells"
                width={32}
                height={32}
                className="size-8"
              />
            )}
          </button>
        ) : (
          // Expanded state: logo on left, collapse icon on right
          <>
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="yanicells"
                width={32}
                height={32}
                className="size-8 transition-transform hover:scale-105"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="size-8 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <PanelLeft className="size-5" />
              <span className="sr-only">Collapse sidebar</span>
            </Button>
          </>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="py-1">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="h-10 hover:bg-sidebar-accent [&_svg]:size-5 group-data-[collapsible=icon]:size-10!"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
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
