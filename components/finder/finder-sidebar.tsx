"use client";

import { Folder, Image as ImageIcon, Monitor, NotebookPen, type LucideIcon } from "lucide-react";
import { useDesktop, useWindow } from "@/components/desktop/desktop-context";
import { TrafficLights } from "@/components/desktop/window-chrome";
import { TAGS, type FinderLocation } from "./finder-data";

const FAVORITES: { location: FinderLocation; label: string; Icon: LucideIcon }[] = [
  { location: "desktop", label: "Desktop", Icon: Monitor },
  { location: "projects", label: "Projects", Icon: Folder },
  { location: "writeups", label: "Write-ups", Icon: NotebookPen },
  { location: "photos", label: "Photos", Icon: ImageIcon },
];

function SidebarItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={`flex h-7 w-full items-center gap-2 rounded-[6px] px-2 text-left text-[13px] text-label ${
          active ? "bg-white/12" : ""
        }`}
      >
        {children}
      </button>
    </li>
  );
}

/**
 * Golden Gate's edge-to-edge sidebar. In the active window it is translucent
 * with colored icons; in background windows it goes flat and gray, which is
 * most of what makes the active window easy to spot.
 */
export function FinderSidebar({
  id,
  location,
}: {
  id: number;
  location: FinderLocation;
}) {
  const { dispatch } = useDesktop();
  const { focused } = useWindow();
  const go = (to: FinderLocation) => dispatch({ type: "navigate", id, location: to });

  return (
    <aside
      className={`hidden w-[184px] shrink-0 flex-col border-r border-black/70 @min-[600px]:flex ${
        focused ? "glass-sidebar" : "bg-[#2a2a2c]"
      }`}
    >
      <div data-drag-handle className="flex h-[52px] shrink-0 items-center pl-4">
        <TrafficLights />
      </div>
      <nav className="flex-1 overflow-y-auto px-2.5 pb-3">
        <h3 className="px-2 pt-1 pb-1 text-[11px] font-semibold text-tertiary-label">
          Favorites
        </h3>
        <ul>
          {FAVORITES.map(({ location: to, label, Icon }) => (
            <SidebarItem key={to} active={location === to} onClick={() => go(to)}>
              <Icon
                className={`size-4 ${focused ? "text-accent" : "text-secondary-label"}`}
                strokeWidth={1.9}
              />
              {label}
            </SidebarItem>
          ))}
        </ul>
        <h3 className="px-2 pt-4 pb-1 text-[11px] font-semibold text-tertiary-label">Tags</h3>
        <ul>
          {TAGS.map((tag) => (
            <SidebarItem
              key={tag.id}
              active={location === `tag:${tag.id}`}
              onClick={() => go(`tag:${tag.id}`)}
            >
              <span className="flex size-4 items-center justify-center">
                <span className="size-2.5 rounded-full" style={{ background: tag.color }} />
              </span>
              {tag.label}
            </SidebarItem>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
