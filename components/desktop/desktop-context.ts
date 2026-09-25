"use client";

import { createContext, use, type Dispatch } from "react";
import type { DesktopAction, WindowContent } from "./window-manager";
import type { FinderItem } from "@/components/finder/finder-data";

interface DesktopApi {
  dispatch: Dispatch<DesktopAction>;
  /** Opens content in a new window, or focuses the window already showing it. */
  open: (content: WindowContent) => void;
  /** Opens a desktop or Finder item: folders get a Finder window, files get their app. */
  openItem: (item: FinderItem) => void;
}

export const DesktopContext = createContext<DesktopApi | null>(null);

export function useDesktop(): DesktopApi {
  const api = use(DesktopContext);
  if (!api) throw new Error("useDesktop must be used inside <Desktop>");
  return api;
}

interface WindowApi {
  id: number;
  focused: boolean;
}

/** The window a component renders in, for its traffic lights and toolbar. */
export const WindowContext = createContext<WindowApi | null>(null);

export function useWindow(): WindowApi {
  const api = use(WindowContext);
  if (!api) throw new Error("useWindow must be used inside a window");
  return api;
}
