"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { DesktopContext } from "./desktop-context";
import { DesktopIcons } from "./desktop-icons";
import { Dock } from "./dock";
import { MenuBar } from "./menu-bar";
import { WindowBody } from "./window-body";
import { WindowFrame } from "./window-frame";
import {
  desktopReducer,
  finderAt,
  focusedWindow,
  type DesktopState,
  type WindowContent,
} from "./window-manager";
import type { FinderItem } from "@/components/finder/finder-data";

const INITIAL_STATE: DesktopState = { windows: [], nextId: 1 };

/**
 * The whole site: wallpaper, desktop items, windows, menu bar, and Dock.
 * Window state lives in one reducer so the menu bar and Dock can act on it.
 */
export function Desktop() {
  const [state, dispatch] = useReducer(desktopReducer, INITIAL_STATE);
  const [selected, setSelected] = useState<string | null>(null);

  const open = useCallback((content: WindowContent) => {
    dispatch({
      type: "open",
      content,
      viewport: { w: window.innerWidth, h: window.innerHeight },
    });
  }, []);

  const openItem = useCallback(
    (item: FinderItem) =>
      open(typeof item.target === "string" ? finderAt(item.target) : item.target),
    [open],
  );

  // Like a Mac restoring its session: start with About Me open, so visitors
  // see who this is before they start clicking around.
  useEffect(() => open({ kind: "about" }), [open]);

  const api = useMemo(() => ({ dispatch, open, openItem }), [open, openItem]);
  const focused = focusedWindow(state);

  // Render in creation order so focusing never reorders the DOM (which would
  // reload iframes); stacking comes from each window's place in `state.windows`.
  const byCreation = [...state.windows].sort((a, b) => a.id - b.id);

  return (
    <DesktopContext value={api}>
      <main
        className="relative h-dvh w-screen overflow-hidden bg-black bg-[url(/wallpaper.png)] bg-cover bg-center"
        onPointerDown={() => setSelected(null)}
      >
        <MenuBar windows={state.windows} focused={focused} />
        <DesktopIcons selected={selected} onSelect={setSelected} />
        {byCreation.map((win) => (
          <WindowFrame
            key={win.id}
            win={win}
            zIndex={10 + state.windows.indexOf(win)}
            focused={win.id === focused?.id}
          >
            <WindowBody win={win} />
          </WindowFrame>
        ))}
        <Dock windows={state.windows} />
      </main>
    </DesktopContext>
  );
}
