"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FolderKanban, User, Layers, Mail, Briefcase } from "lucide-react";

const navItems = [
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "About",
    url: "/about",
    icon: User,
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
  {
    title: "Experience",
    url: "/experience",
    icon: Briefcase,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <Link
          href="/"
          className="font-mono text-lg text-primary hover:text-[var(--ctp-blue-hover)] transition-colors"
        >
          &lt;yanicells /&gt;
        </Link>
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
    </Sidebar>
  );
}
