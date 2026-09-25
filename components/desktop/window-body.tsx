"use client";

import { FinderWindow } from "@/components/finder/finder-window";
import type { WindowState } from "./window-manager";

/** Picks the app view for a window's content. */
export function WindowBody({ win }: { win: WindowState }) {
  const { content } = win;
  switch (content.kind) {
    case "finder":
      return <FinderWindow id={win.id} content={content} />;
    default:
      return null;
  }
}
