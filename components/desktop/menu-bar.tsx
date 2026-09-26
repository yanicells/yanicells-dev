"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDesktop } from "./desktop-context";
import { useNow } from "./use-now";
import {
  APP_NAMES,
  appOf,
  finderAt,
  titleOf,
  type WindowState,
} from "./window-manager";
import type { FinderLocation } from "@/components/finder/finder-data";
import {
  AppleLogo,
  BatteryIcon,
  ControlCenterIcon,
  SpotlightIcon,
  WifiIcon,
} from "./status-icons";

type MenuItem =
  | { label: string; onSelect?: () => void; checked?: boolean }
  | "separator";

interface Menu {
  id: string;
  title: ReactNode;
  label: string;
  bold?: boolean;
  items: MenuItem[];
  /** Hidden on phones, where only the Apple and app menus fit. */
  wide?: boolean;
}

/** Live clock in the menu bar's "Sat Sep 26  1:17 AM" format; client-only. */
function Clock() {
  const now = useNow();
  if (!now) return null;
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <span className="whitespace-nowrap tabular-nums">
      <span className="hidden sm:inline">{date.replace(",", "")}&nbsp;&nbsp;</span>
      {time}
    </span>
  );
}

/**
 * The menu bar. Menus follow the focused app, like the real one, and route
 * their commands to the window manager. Items without a command are dimmed.
 */
export function MenuBar({
  windows,
  focused,
}: {
  windows: WindowState[];
  focused: WindowState | undefined;
}) {
  const { dispatch, open } = useDesktop();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  const app = focused ? appOf(focused.content) : "finder";
  const appName = APP_NAMES[app];
  const finder = focused?.content.kind === "finder" ? focused : undefined;
  const visible = windows.filter((w) => !w.minimized);

  const go = (location: FinderLocation) =>
    finder
      ? dispatch({ type: "navigate", id: finder.id, location })
      : open(finderAt(location));

  const menus: Menu[] = [
    {
      id: "apple",
      title: <AppleLogo />,
      label: "Apple",
      items: [
        { label: "About Yani", onSelect: () => open({ kind: "about" }) },
        "separator",
        { label: "Sleep" },
        { label: "Restart…" },
        { label: "Shut Down…" },
        "separator",
        { label: "Lock Screen" },
        { label: "Log Out Yani…" },
      ],
    },
    {
      id: "app",
      title: appName,
      label: appName,
      bold: true,
      items: [
        { label: `Hide ${appName}`, onSelect: () => dispatch({ type: "hideApp", app }) },
        ...(app === "finder"
          ? []
          : [{ label: `Quit ${appName}`, onSelect: () => dispatch({ type: "quitApp", app }) }]),
      ],
    },
    {
      id: "file",
      title: "File",
      label: "File",
      wide: true,
      items: [
        ...(app === "finder"
          ? [{ label: "New Finder Window", onSelect: () => open(finderAt("projects")) }]
          : []),
        {
          label: "Close Window",
          onSelect: focused ? () => dispatch({ type: "close", id: focused.id }) : undefined,
        },
      ],
    },
    {
      id: "edit",
      title: "Edit",
      label: "Edit",
      wide: true,
      items: [
        { label: "Undo" },
        { label: "Redo" },
        "separator",
        { label: "Cut" },
        { label: "Copy" },
        { label: "Paste" },
        { label: "Select All" },
      ],
    },
    ...(app === "finder"
      ? [
          {
            id: "view",
            title: "View",
            label: "View",
            wide: true,
            items: (["icons", "list"] as const).map((view) => ({
              label: view === "icons" ? "as Icons" : "as List",
              checked: finder?.content.kind === "finder" && finder.content.view === view,
              onSelect: finder ? () => dispatch({ type: "view", id: finder.id, view }) : undefined,
            })),
          },
          {
            id: "go",
            title: "Go",
            label: "Go",
            wide: true,
            items: [
              {
                label: "Back",
                onSelect:
                  finder?.content.kind === "finder" && finder.content.index > 0
                    ? () => dispatch({ type: "history", id: finder.id, delta: -1 })
                    : undefined,
              },
              {
                label: "Forward",
                onSelect:
                  finder?.content.kind === "finder" &&
                  finder.content.index < finder.content.history.length - 1
                    ? () => dispatch({ type: "history", id: finder.id, delta: 1 })
                    : undefined,
              },
              "separator",
              { label: "Desktop", onSelect: () => go("desktop") },
              { label: "Projects", onSelect: () => go("projects") },
              { label: "Photos", onSelect: () => go("photos") },
            ] satisfies MenuItem[],
          },
        ]
      : []),
    {
      id: "window",
      title: "Window",
      label: "Window",
      wide: true,
      items: [
        {
          label: "Minimize",
          onSelect: focused ? () => dispatch({ type: "minimize", id: focused.id }) : undefined,
        },
        {
          label: "Zoom",
          onSelect: focused ? () => dispatch({ type: "zoom", id: focused.id }) : undefined,
        },
        "separator",
        {
          label: "Bring All to Front",
          onSelect: visible.length ? () => dispatch({ type: "showApp", app }) : undefined,
        },
        ...(windows.length ? ["separator" as const] : []),
        ...[...windows]
          .sort((a, b) => a.id - b.id)
          .map((w) => ({
            label: titleOf(w.content),
            checked: w.id === focused?.id,
            onSelect: () => dispatch({ type: "focus", id: w.id }),
          })),
      ],
    },
    {
      id: "help",
      title: "Help",
      label: "Help",
      wide: true,
      items: [
        { label: "Contact Yani", onSelect: () => open({ kind: "contact" }) },
        { label: "Resume", onSelect: () => open({ kind: "web", doc: "resume" }) },
      ],
    },
  ];

  return (
    <nav
      ref={barRef}
      aria-label="Menu bar"
      className="fixed inset-x-0 top-0 z-[1000] flex h-(--menubar-h) items-center justify-between px-2 text-[13px] text-white"
    >
      {/* A sibling layer, so the menus' own glass isn't nested inside this one. */}
      <div className="glass-bar absolute inset-0 -z-10" />
      <ul className="flex h-full items-center">
        {menus.map((menu) => (
          <li key={menu.id} className={`relative h-full ${menu.wide ? "hidden sm:block" : ""}`}>
            <button
              type="button"
              aria-label={menu.label}
              aria-haspopup="menu"
              aria-expanded={openMenu === menu.id}
              onPointerDown={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                setOpenMenu(openMenu === menu.id ? null : menu.id);
              }}
              onPointerEnter={() => openMenu && setOpenMenu(menu.id)}
              className={`flex h-full items-center rounded-[5px] px-2.5 ${
                menu.bold ? "font-semibold" : ""
              } ${openMenu === menu.id ? "bg-white/20" : ""}`}
            >
              {menu.title}
            </button>
            {openMenu === menu.id && (
              <ul
                role="menu"
                className="glass-raised absolute top-[calc(100%+2px)] left-0 min-w-[220px] animate-menu-in rounded-[10px] p-[5px]"
              >
                {menu.items.map((item, i) =>
                  item === "separator" ? (
                    <li key={i} role="separator" className="mx-2.5 my-[5px] h-px bg-white/12" />
                  ) : (
                    <li key={i} role="none">
                      <button
                        type="button"
                        role="menuitem"
                        disabled={!item.onSelect}
                        onClick={() => {
                          item.onSelect?.();
                          setOpenMenu(null);
                        }}
                        className="flex h-[22px] w-full items-center gap-1.5 rounded-[5px] pr-5 pl-1.5 text-left whitespace-nowrap text-white enabled:hover:bg-accent disabled:text-white/30"
                      >
                        <span className="w-3.5 text-[11px]">{item.checked ? "✓" : ""}</span>
                        {item.label}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="flex h-full items-center gap-3.5 pr-1.5" aria-hidden>
        <span className="hidden items-center gap-3.5 sm:flex">
          <BatteryIcon />
          <WifiIcon />
          <SpotlightIcon />
          <ControlCenterIcon />
        </span>
        <Clock />
      </div>
    </nav>
  );
}
