"use client";

import { useState, useEffect } from "react";
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
import { HelpDialog } from "@/components/shared/help-dialog";
import { chats } from "@/lib/data/chats";
import {
  Home,
  FolderKanban,
  User,
  Layers,
  Mail,
  Briefcase,
  MessageSquare,
  PanelLeft,
  X,
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
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const isCollapsed = state === "collapsed";

  // Reset hover state when sidebar collapses to ensure logo shows first
  useEffect(() => {
    if (isCollapsed) {
      setIsHeaderHovered(false);
    }
  }, [isCollapsed]);
  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={`flex w-full items-center ${isCollapsed && !isMobile ? "justify-center" : "justify-between"}`}
            >
              {/* When expanded: show logo on left, PanelLeft on right */}
              {/* When collapsed on desktop: show logo (or PanelLeft on hover) centered */}
              {/* When on mobile: show logo and X */}

              {!isCollapsed && !isMobile && (
                <>
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      alt="yanicells"
                      width={32}
                      height={32}
                      className="size-8"
                    />
                  </Link>
                  <SidebarMenuButton
                    onClick={toggleSidebar}
                    tooltip="Collapse Sidebar"
                    className="size-10"
                  >
                    <PanelLeft />
                  </SidebarMenuButton>
                </>
              )}

              {isCollapsed && !isMobile && (
                <SidebarMenuButton
                  onClick={toggleSidebar}
                  tooltip="Expand Sidebar"
                  className="size-10"
                  onMouseEnter={() => setIsHeaderHovered(true)}
                  onMouseLeave={() => setIsHeaderHovered(false)}
                >
                  {isHeaderHovered ? (
                    <PanelLeft />
                  ) : (
                    <Image
                      src="/logo.png"
                      alt="yanicells"
                      width={20}
                      height={20}
                      className="size-8"
                    />
                  )}
                </SidebarMenuButton>
              )}

              {isMobile && (
                <>
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      alt="yanicells"
                      width={32}
                      height={32}
                      className="size-8"
                    />
                  </Link>
                  <SidebarMenuButton
                    onClick={toggleSidebar}
                    tooltip="Close Sidebar"
                    className="size-10"
                  >
                    <X />
                  </SidebarMenuButton>
                </>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
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
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
            Chats
          </p>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.slug}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/chats/${chat.slug}`}
                    tooltip={chat.title}
                  >
                    <Link href={`/chats/${chat.slug}`}>
                      <MessageSquare />
                      <span>{chat.title}</span>
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
