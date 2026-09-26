"use client";

import { useCallback, useMemo, useReducer, useState } from "react";
import { StartupScreen } from "@/components/startup/startup-screen";
import { SpotifyWidget } from "@/components/widgets/spotify-widget";
import { FolderGradients } from "@/components/finder/file-icons";
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

  const [unlocked, setUnlocked] = useState(false);

  const api = useMemo(() => ({ dispatch, open, openItem }), [open, openItem]);
  const focused = focusedWindow(state);

  // Render in creation order so focusing never reorders the DOM (which would
  // reload iframes); stacking comes from each window's place in `state.windows`.
  const byCreation = [...state.windows].sort((a, b) => a.id - b.id);

  return (
    <DesktopContext value={api}>
      {!unlocked && (
        <StartupScreen
          // Open About Me as the lock screen slides away, so visitors land
          // on who this is before they start clicking around.
          onUnlock={() => open({ kind: "about" })}
          onDone={() => setUnlocked(true)}
        />
      )}
      <main
        inert={!unlocked}
        className="relative h-dvh w-screen overflow-hidden bg-black bg-[url(/wallpaper.jpg)] bg-cover bg-center"
        onPointerDown={() => setSelected(null)}
      >
        <MenuBar windows={state.windows} focused={focused} />
        <FolderGradients />
        <SpotifyWidget />
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
