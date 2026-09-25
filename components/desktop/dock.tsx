"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useDesktop } from "./desktop-context";
import { AppIcon, TrashIcon } from "./app-icons";
import {
  APP_NAMES,
  appOf,
  finderAt,
  type AppId,
  type WindowState,
} from "./window-manager";

/** Pinned for looks only: the apps Yani actually keeps in his Dock. They don't open. */
const PINNED = [
  { name: "Zed", src: "/dock/zed.png" },
  { name: "Claude", src: "/dock/claude.png" },
  { name: "Codex", src: "/dock/codex.svg" },
  { name: "Notion", src: "/dock/notion.png" },
  { name: "Spotify", src: "/dock/spotify.png" },
];

function Tooltip({ label }: { label: string }) {
  // Kept outside the Dock's glass so it can blur on its own.
  return (
    <span className="glass pointer-events-none absolute -top-10 rounded-lg px-2.5 py-1 text-[13px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
      {label}
    </span>
  );
}

/**
 * The system PNGs carry Apple's standard transparent margin around the
 * squircle; the Codex SVG and the drawn icons get the same margin here.
 */
function PinnedApp({ name, src }: { name: string; src: string }) {
  const isSvg = src.endsWith(".svg");
  return (
    <li className="group relative flex flex-col items-center" aria-hidden>
      <Tooltip label={name} />
      <Image
        src={src}
        alt=""
        width={50}
        height={50}
        unoptimized={isSvg}
        draggable={false}
        className={`size-[50px] ${isSvg ? "p-[5px] drop-shadow-[0_1px_2px_rgb(0_0_0/0.35)]" : ""}`}
      />
      <span className="mt-[3px] size-1" />
    </li>
  );
}

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
      <Tooltip label={label} />
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className={`size-[50px] p-[5px] active:brightness-60 ${bounce ? "animate-dock-bounce" : ""}`}
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
 * The Dock: Finder, the pinned apps, then whichever portfolio apps have
 * windows open (in launch order), then the Trash.
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
        {PINNED.map((app) => (
          <PinnedApp key={app.name} {...app} />
        ))}
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
