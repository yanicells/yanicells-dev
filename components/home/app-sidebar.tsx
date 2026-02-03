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

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={`flex w-full items-center ${isCollapsed ? "justify-center" : "justify-between"}`}
            >
              {/* Logo - hidden when collapsed */}
              {!isCollapsed && (
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="yanicells"
                    width={32}
                    height={32}
                    className="size-8"
                  />
                </Link>
              )}
              {/* Collapse trigger */}
              <SidebarMenuButton
                onClick={toggleSidebar}
                tooltip="Toggle Sidebar"
                className="size-8"
              >
                <PanelLeft />
              </SidebarMenuButton>
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
