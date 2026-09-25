"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { WindowContext, useDesktop } from "./desktop-context";
import {
  DOCK_SPACE,
  MENU_BAR_HEIGHT,
  titleOf,
  type WindowState,
} from "./window-manager";

const ACTIVE_SHADOW =
  "0 0 0 0.5px rgb(0 0 0 / 0.9), 0 26px 70px rgb(0 0 0 / 0.6), 0 8px 22px rgb(0 0 0 / 0.4)";
const INACTIVE_SHADOW =
  "0 0 0 0.5px rgb(0 0 0 / 0.75), 0 10px 30px rgb(0 0 0 / 0.35)";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Positions a window and handles focus and dragging. Anything marked
 * `data-drag-handle` inside it (toolbars, the sidebar top) moves the window.
 * Dragging writes to the DOM directly and commits the position on release.
 */
export function WindowFrame({
  win,
  zIndex,
  focused,
  children,
}: {
  win: WindowState;
  zIndex: number;
  focused: boolean;
  children: ReactNode;
}) {
  const { dispatch } = useDesktop();
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!focused) dispatch({ type: "focus", id: win.id });

    const target = event.target as HTMLElement;
    const onHandle =
      target.closest("[data-drag-handle]") &&
      !target.closest("button, a, input, [data-no-drag]");
    const el = ref.current;
    if (!onHandle || !el || win.zoomed || event.button !== 0) return;

    const startX = event.clientX;
    const startY = event.clientY;
    let x = win.x;
    let y = win.y;

    el.setPointerCapture(event.pointerId);
    document.body.classList.add("dragging");

    const move = (e: globalThis.PointerEvent) => {
      x = clamp(win.x + e.clientX - startX, 80 - win.w, window.innerWidth - 80);
      y = clamp(win.y + e.clientY - startY, MENU_BAR_HEIGHT, window.innerHeight - 60);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };
    const end = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      document.body.classList.remove("dragging");
      if (x !== win.x || y !== win.y) dispatch({ type: "move", id: win.id, x, y });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  }

  const rect = win.zoomed
    ? {
        left: 0,
        top: MENU_BAR_HEIGHT,
        width: "100%",
        height: `calc(100% - ${MENU_BAR_HEIGHT + DOCK_SPACE}px)`,
      }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <WindowContext value={{ id: win.id, focused }}>
      <div
        ref={ref}
        role="dialog"
        aria-label={titleOf(win.content)}
        onPointerDown={handlePointerDown}
        onDoubleClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("[data-drag-handle]") && !target.closest("[data-no-drag]")) {
            dispatch({ type: "zoom", id: win.id });
          }
        }}
        className={`absolute flex animate-window-in flex-col overflow-hidden rounded-[12px] ${
          win.minimized ? "hidden" : ""
        }`}
        style={{
          ...rect,
          zIndex,
          boxShadow: focused ? ACTIVE_SHADOW : INACTIVE_SHADOW,
        }}
      >
        {children}
        {/* Hairline highlight around the edge, drawn above the content. */}
        <div className="pointer-events-none absolute inset-0 rounded-[12px] shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.16)]" />
      </div>
    </WindowContext>
  );
}
