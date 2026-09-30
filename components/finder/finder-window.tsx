"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, List, Search } from "lucide-react";
import { useDesktop, useWindow } from "@/components/desktop/desktop-context";
import { Toolbar, TrafficLights } from "@/components/desktop/window-chrome";
import type { WindowContent } from "@/components/desktop/window-manager";
import { FinderSidebar } from "./finder-sidebar";
import { IconView, ListView } from "./finder-views";
import { itemsAt, locationLabel, type FinderItem, type FinderLocation } from "./finder-data";

type FinderContent = Extract<WindowContent, { kind: "finder" }>;

function matches(item: FinderItem, query: string) {
  const haystack = `${item.name} ${item.kind} ${item.comment ?? ""} ${item.keywords ?? ""}`;
  return haystack.toLowerCase().includes(query.toLowerCase());
}

/**
 * Toolbar and contents for one folder. Keyed by location, so search and
 * selection reset whenever the window navigates somewhere else.
 */
function FolderPane({ id, content, location }: { id: number; content: FinderContent; location: FinderLocation }) {
  const { dispatch, openItem } = useDesktop();
  const { focused } = useWindow();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const items = itemsAt(location).filter((item) => !query || matches(item, query));
  const canGoBack = content.index > 0;
  const canGoForward = content.index < content.history.length - 1;

  const handleOpen = (item: FinderItem) => {
    setSelected(item.id);
    if (typeof item.target === "string") {
      dispatch({ type: "navigate", id, location: item.target });
    } else {
      openItem(item);
    }
  };

  const navButton = "flex h-full w-8 items-center justify-center disabled:text-tertiary-label";
  const viewButton = (active: boolean) =>
    `flex h-[24px] w-8 items-center justify-center rounded-full ${active ? "bg-white/16" : ""}`;

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-window">
      <Toolbar
        title={locationLabel(location)}
        leading={
          <>
            <span className="@min-[600px]:hidden">
              <TrafficLights />
            </span>
            <div className="toolbar-button flex shrink-0 items-center px-0.5" data-no-drag>
              <button
                type="button"
                aria-label="Back"
                disabled={!canGoBack}
                onClick={() => dispatch({ type: "history", id, delta: -1 })}
                className={navButton}
              >
                <ChevronLeft className="size-[18px]" strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label="Forward"
                disabled={!canGoForward}
                onClick={() => dispatch({ type: "history", id, delta: 1 })}
                className={navButton}
              >
                <ChevronRight className="size-[18px]" strokeWidth={2} />
              </button>
            </div>
          </>
        }
      >
        <div className="toolbar-button flex items-center gap-0.5 px-[3px]" role="group" aria-label="View">
          <button
            type="button"
            aria-label="as Icons"
            aria-pressed={content.view === "icons"}
            onClick={() => dispatch({ type: "view", id, view: "icons" })}
            className={viewButton(content.view === "icons")}
          >
            <LayoutGrid className="size-[15px]" strokeWidth={1.9} />
          </button>
          <button
            type="button"
            aria-label="as List"
            aria-pressed={content.view === "list"}
            onClick={() => dispatch({ type: "view", id, view: "list" })}
            className={viewButton(content.view === "list")}
          >
            <List className="size-[16px]" strokeWidth={1.9} />
          </button>
        </div>
        <label className="toolbar-button hidden w-44 items-center gap-1.5 px-2.5 @min-[720px]:flex">
          <Search className="size-[14px] shrink-0 text-secondary-label" strokeWidth={2} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            aria-label={`Search ${locationLabel(location)}`}
            className="selectable w-full min-w-0 bg-transparent text-[13px] outline-none placeholder:text-tertiary-label"
          />
        </label>
      </Toolbar>

      <div className="min-h-0 flex-1 overflow-y-auto" onPointerDown={(e) => e.target === e.currentTarget && setSelected(null)}>
        {query && items.length === 0 ? (
          <p className="pt-16 text-center text-[13px] text-secondary-label">No results</p>
        ) : content.view === "icons" ? (
          <IconView items={items} selected={selected} onOpen={handleOpen} />
        ) : (
          <ListView items={items} selected={selected} onOpen={handleOpen} />
        )}
      </div>

      <footer
        className={`flex h-[26px] shrink-0 items-center justify-center border-t border-black/60 text-[11px] ${
          focused ? "text-secondary-label" : "text-tertiary-label"
        }`}
      >
        {items.length} {items.length === 1 ? "item" : "items"}
      </footer>
    </section>
  );
}

/** A Finder window: edge-to-edge sidebar on the left, the current folder on the right. */
export function FinderWindow({ id, content }: { id: number; content: FinderContent }) {
  const location = content.history[content.index];
  return (
    <div className="@container flex h-full min-h-0">
      <FinderSidebar id={id} location={location} />
      <FolderPane key={location} id={id} content={content} location={location} />
    </div>
  );
}
