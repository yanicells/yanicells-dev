"use client";

import type { ReactNode } from "react";
import { useDesktop } from "./desktop-context";
import { AppIcon, TrashIcon } from "./app-icons";
import {
  APP_NAMES,
  appOf,
  finderAt,
  type AppId,
  type WindowState,
} from "./window-manager";

function DockItem({
  label,
  running,
  bounce,
  onClick,
  children,
}: {
  label: string;
  running?: boolean;
  bounce?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <li className="group relative flex flex-col items-center">
      {/* Tooltip, kept outside the Dock's glass so it can blur on its own. */}
      <span className="glass pointer-events-none absolute -top-10 rounded-lg px-2.5 py-1 text-[13px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className={`size-[50px] active:brightness-60 ${bounce ? "animate-dock-bounce" : ""}`}
      >
        {children}
      </button>
      <span
        className={`mt-[3px] size-1 rounded-full ${running ? "bg-white/75" : "bg-transparent"}`}
      />
    </li>
  );
}

/**
 * The Dock: Finder, then whichever apps have windows open (in launch order),
 * then the Trash. Nothing is pinned just to fill space.
 */
export function Dock({ windows }: { windows: WindowState[] }) {
  const { dispatch, open } = useDesktop();

  const launched = new Map<AppId, number>();
  for (const w of windows) {
    const app = appOf(w.content);
    launched.set(app, Math.min(launched.get(app) ?? Infinity, w.id));
  }
  const running = [...launched.keys()]
    .filter((app) => app !== "finder")
    .sort((a, b) => launched.get(a)! - launched.get(b)!);

  const activate = (app: AppId) => {
    if (launched.has(app)) dispatch({ type: "showApp", app });
    else if (app === "finder") open(finderAt("projects"));
  };

  return (
    <nav
      aria-label="Dock"
      className="fixed bottom-[5px] left-1/2 z-[900] -translate-x-1/2"
    >
      <div className="glass absolute inset-0 -z-10 rounded-[22px]" />
      <ul className="flex items-end gap-1.5 px-[7px] pt-[7px] pb-[3px]">
        <DockItem label="Finder" running onClick={() => activate("finder")}>
          <AppIcon app="finder" />
        </DockItem>
        {running.map((app) => (
          <DockItem key={app} label={APP_NAMES[app]} running bounce onClick={() => activate(app)}>
            <AppIcon app={app} />
          </DockItem>
        ))}
        <li aria-hidden className="mx-1 mt-1 mb-[11px] w-px self-stretch bg-white/20" />
        <DockItem label="Trash" onClick={() => open(finderAt("trash"))}>
          <TrashIcon />
        </DockItem>
      </ul>
    </nav>
  );
}
