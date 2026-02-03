"use client";

import Image from "next/image";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  FolderKanban,
  User,
  Layers,
  Mail,
  Briefcase,
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

  return (
    <Link href="/" className="flex items-center gap-2">
      {state === "collapsed" ? (
        <Image
          src="/logo.png"
          alt="yanicells"
          width={32}
          height={32}
          className="size-8"
        />
      ) : (
        <span className="font-mono text-lg text-primary transition-colors hover:text-(--ctp-blue-hover)">
          &lt;yanicells /&gt;
        </span>
      )}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <SidebarLogo />
        <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent" />
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
