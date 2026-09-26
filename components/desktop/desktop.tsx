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
 * On phones, `cover` blows the artwork up past the screen edges. Shrink it and
 * sit it above the Dock instead, over the artwork's own paper color.
 */
const PHONE_WALLPAPER =
  "max-sm:bg-[#181715] max-sm:bg-size-[165%_auto] max-sm:bg-position-[center_bottom_84px] max-sm:bg-no-repeat";

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
        className={`relative h-dvh w-screen overflow-hidden bg-black bg-[url(/wallpaper.jpg)] bg-cover bg-center ${PHONE_WALLPAPER}`}
        onPointerDown={() => setSelected(null)}
      >
        <MenuBar windows={state.windows} focused={focused} />
        <FolderGradients />
        {/* Phones stack these like an iOS home screen; larger screens place each on its own. */}
        <div className="max-sm:absolute max-sm:inset-x-0 max-sm:top-(--menubar-h) max-sm:flex max-sm:flex-col max-sm:gap-6 max-sm:px-4 max-sm:pt-4 sm:contents">
          <SpotifyWidget />
          <DesktopIcons selected={selected} onSelect={setSelected} />
        </div>
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
