"use client";

import { useState, type PointerEvent } from "react";
import Image from "next/image";
import { useDesktop } from "./desktop-context";
import {
  APP_NAMES,
  appOf,
  finderAt,
  type AppId,
  type WindowState,
} from "./window-manager";

/**
 * Icons rendered by macOS from the real app bundles, so they carry Apple's
 * standard transparent margin around the squircle. Codex isn't installed
 * locally, so it's an SVG that gets that margin added.
 */
const APP_ICONS: Record<AppId, string> = {
  finder: "/dock/finder.png",
  textedit: "/dock/textedit.png",
  preview: "/dock/preview.png",
  contacts: "/dock/contacts.png",
};

/** Yani's Dock, in his order. For looks: they can be rearranged but don't open. */
const PINNED = [
  { name: "Zen", src: "/dock/zen.png" },
  { name: "Spotify", src: "/dock/spotify.png" },
  { name: "Notion", src: "/dock/notion.png" },
  { name: "Codex", src: "/dock/codex.svg" },
  { name: "T3 Code", src: "/dock/t3.png" },
  { name: "Ghostty", src: "/dock/ghostty.png" },
  { name: "Google Chrome", src: "/dock/chrome.png" },
  { name: "Claude", src: "/dock/claude.png" },
  { name: "Cursor", src: "/dock/cursor.png" },
];

const ICON = 50;
const STEP = ICON + 6; // icon width plus the gap between Dock items

function DockIcon({ src }: { src: string }) {
  const isSvg = src.endsWith(".svg");
  return (
    <Image
      src={src}
      alt=""
      width={ICON}
      height={ICON}
      unoptimized={isSvg}
      draggable={false}
      className={`size-[50px] ${isSvg ? "p-[5px] drop-shadow-[0_1px_2px_rgb(0_0_0/0.35)]" : ""}`}
    />
  );
}

function Tooltip({ label, hidden }: { label: string; hidden?: boolean }) {
  // Kept outside the Dock's glass so it can blur on its own.
  return (
    <span
      className={`glass pointer-events-none absolute -top-10 rounded-lg px-2.5 py-1 text-[13px] whitespace-nowrap text-white opacity-0 transition-opacity ${
        hidden ? "" : "group-hover:opacity-100"
      }`}
    >
      {label}
    </span>
  );
}

function RunningDot({ running }: { running?: boolean }) {
  return <span className={`mt-[3px] size-1 rounded-full ${running ? "bg-white/75" : ""}`} />;
}

function DockItem({
  label,
  src,
  running,
  bounce,
  onClick,
}: {
  label: string;
  src: string;
  running?: boolean;
  bounce?: boolean;
  onClick: () => void;
}) {
  return (
    <li className="group relative flex flex-col items-center">
      <Tooltip label={label} />
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className={`active:brightness-60 ${bounce ? "animate-dock-bounce" : ""}`}
      >
        <DockIcon src={src} />
      </button>
      <RunningDot running={running} />
    </li>
  );
}

interface Drag {
  name: string;
  from: number;
  startX: number;
  dx: number;
  active: boolean;
}

/**
 * The pinned apps, which can be dragged sideways to rearrange like the real
 * Dock. While dragging, neighbors slide over to open a gap; on release the
 * order commits and the dropped icon glides into its slot.
 */
function PinnedApps() {
  const [order, setOrder] = useState(PINNED);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [settle, setSettle] = useState<{ name: string; offset: number } | null>(null);

  const last = order.length - 1;
  const target = drag ? Math.min(last, Math.max(0, drag.from + Math.round(drag.dx / STEP))) : -1;

  function handlePointerDown(event: PointerEvent<HTMLLIElement>, name: string, from: number) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ name, from, startX: event.clientX, dx: 0, active: false });
  }

  function handlePointerMove(event: PointerEvent<HTMLLIElement>) {
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    setDrag({ ...drag, dx, active: drag.active || Math.abs(dx) > 4 });
  }

  function handlePointerUp() {
    if (!drag) return;
    if (drag.active && target !== drag.from) {
      const next = [...order];
      const [moved] = next.splice(drag.from, 1);
      next.splice(target, 0, moved);
      setOrder(next);
    }
    // Hold the dropped icon where it was let go for one frame, then let it glide home.
    setSettle({ name: drag.name, offset: drag.active ? drag.dx - (target - drag.from) * STEP : 0 });
    setDrag(null);
    requestAnimationFrame(() => requestAnimationFrame(() => setSettle(null)));
  }

  function offsetOf(name: string, index: number): number {
    if (settle) return settle.name === name ? settle.offset : 0;
    if (!drag?.active) return 0;
    if (name === drag.name) {
      return Math.min((last - drag.from) * STEP + 16, Math.max(-drag.from * STEP - 16, drag.dx));
    }
    if (drag.from < target && index > drag.from && index <= target) return -STEP;
    if (target < drag.from && index >= target && index < drag.from) return STEP;
    return 0;
  }

  return order.map((app, index) => {
    const isDragged = drag?.active && drag.name === app.name;
    return (
      <li
        key={app.name}
        aria-hidden
        onPointerDown={(event) => handlePointerDown(event, app.name, index)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`group relative flex touch-none flex-col items-center max-sm:hidden ${
          isDragged ? "z-10" : ""
        } ${settle || isDragged ? "" : "transition-transform duration-200 ease-out"}`}
        style={{ transform: `translateX(${offsetOf(app.name, index)}px)` }}
      >
        <Tooltip label={app.name} hidden={!!drag?.active} />
        <DockIcon src={app.src} />
        <RunningDot running />
      </li>
    );
  });
}

/**
 * The Dock: Finder, Yani's apps, then whichever portfolio apps have windows
 * open (in launch order), then the Trash.
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
    <nav aria-label="Dock" className="fixed bottom-[5px] left-1/2 z-[900] -translate-x-1/2">
      <div className="glass absolute inset-0 -z-10 rounded-[22px]" />
      <ul className="flex items-end gap-1.5 px-[7px] pt-[7px] pb-[3px]">
        <DockItem label="Finder" src={APP_ICONS.finder} running onClick={() => activate("finder")} />
        <PinnedApps />
        {running.map((app) => (
          <DockItem
            key={app}
            label={APP_NAMES[app]}
            src={APP_ICONS[app]}
            running
            bounce
            onClick={() => activate(app)}
          />
        ))}
        <li aria-hidden className="mx-1 mt-1 mb-[11px] w-px self-stretch bg-white/20" />
        <DockItem label="Trash" src="/dock/trash-full.png" onClick={() => open(finderAt("trash"))} />
      </ul>
    </nav>
  );
}
