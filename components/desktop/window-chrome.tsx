"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useDesktop, useWindow } from "./desktop-context";

const LIGHTS = [
  {
    action: "close",
    label: "Close",
    color: "bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_#e0443e]",
    hover: "group-hover/lights:bg-[#ff5f57]",
    glyph: <path d="M3 3l6 6M9 3l-6 6" />,
  },
  {
    action: "minimize",
    label: "Minimize",
    color: "bg-[#febc2e] shadow-[inset_0_0_0_0.5px_#dea123]",
    hover: "group-hover/lights:bg-[#febc2e]",
    glyph: <path d="M2.5 6h7" />,
  },
  {
    action: "zoom",
    label: "Zoom",
    color: "bg-[#28c840] shadow-[inset_0_0_0_0.5px_#1aab29]",
    hover: "group-hover/lights:bg-[#28c840]",
    glyph: (
      <path d="M3.2 8.8V4.6l4.2 4.2zM8.8 3.2v4.2L4.6 3.2z" fill="currentColor" stroke="none" />
    ),
  },
] as const;

/**
 * Close, minimize, and zoom. Gray in background windows until hovered;
 * the glyphs appear when the pointer is over the group, as on macOS.
 * On phones, a single close button stands in for all three.
 */
export function TrafficLights() {
  const { id, focused } = useWindow();
  const { dispatch } = useDesktop();

  return (
    <>
      {/* Phones get one thumb-sized close button; apps open full screen there. */}
      <button
        type="button"
        aria-label="Close"
        onClick={(event) => {
          event.stopPropagation();
          dispatch({ type: "close", id });
        }}
        className="toolbar-button flex w-[30px] shrink-0 items-center justify-center sm:hidden"
        data-no-drag
      >
        <X className="size-4" strokeWidth={2.2} />
      </button>
      <div className="group/lights flex items-center gap-2 max-sm:hidden" data-no-drag>
        {LIGHTS.map((light) => (
          <button
            key={light.action}
            type="button"
            aria-label={light.label}
            onClick={(event) => {
              event.stopPropagation();
              dispatch({ type: light.action, id });
            }}
            className={`flex size-3 items-center justify-center rounded-full text-black/55 ${
              focused
                ? light.color
                : `bg-[#3d3d3f] shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.08)] ${light.hover}`
            }`}
          >
            <svg
              viewBox="0 0 12 12"
              className="size-2 opacity-0 group-hover/lights:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              aria-hidden
            >
              {light.glyph}
            </svg>
          </button>
        ))}
      </div>
    </>
  );
}

/**
 * Golden Gate's uniform toolbar: a real bar, not floating buttons over content.
 * The whole bar drags the window, and double-clicking it zooms.
 */
export function Toolbar({
  leading,
  title,
  children,
}: {
  leading?: ReactNode;
  title: string;
  children?: ReactNode;
}) {
  const { focused } = useWindow();
  return (
    <header
      data-drag-handle
      className="flex h-[52px] shrink-0 items-center gap-3 border-b border-black/70 bg-[#262626] px-3.5 shadow-[inset_0_-0.5px_0_rgb(255_255_255/0.04)]"
    >
      {leading}
      <h2
        className={`min-w-0 flex-1 truncate text-[15px] font-semibold ${
          focused ? "text-label" : "text-tertiary-label"
        }`}
      >
        {title}
      </h2>
      <div className={`flex items-center gap-2 ${focused ? "" : "opacity-50"}`} data-no-drag>
        {children}
      </div>
    </header>
  );
}
