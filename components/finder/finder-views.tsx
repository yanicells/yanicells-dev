"use client";

import { useWindow } from "@/components/desktop/desktop-context";
import { FileIcon } from "./file-icons";
import { TAGS, type FinderItem } from "./finder-data";

interface ViewProps {
  items: FinderItem[];
  selected: string | null;
  onOpen: (item: FinderItem) => void;
}

function TagDots({ item }: { item: FinderItem }) {
  if (!item.tags?.length) return null;
  return (
    <span className="ml-1 inline-flex -space-x-[3px] align-[-1px]">
      {item.tags.map((id) => (
        <span
          key={id}
          className="size-2 rounded-full ring-[1.5px] ring-window"
          style={{ background: TAGS.find((t) => t.id === id)?.color }}
        />
      ))}
    </span>
  );
}

/** Finder's icon view: previews for projects and photos, real icons for the rest. */
export function IconView({ items, selected, onOpen }: ViewProps) {
  const { focused } = useWindow();
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] content-start gap-y-4 px-3 py-4">
      {items.map((item) => {
        const isSelected = selected === item.id;
        return (
          <li key={item.id} className="flex justify-center">
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="flex w-[100px] flex-col items-center gap-1.5 rounded-md outline-accent focus-visible:outline-2"
            >
              <span className={`size-[76px] rounded-[6px] p-1 ${isSelected ? "bg-white/12" : ""}`}>
                <FileIcon icon={item.icon} size={68} />
              </span>
              <span
                className={`line-clamp-2 rounded-[4px] px-1 text-center text-[12px] leading-[15px] ${
                  isSelected ? (focused ? "bg-accent text-white" : "bg-white/20") : "text-label"
                }`}
              >
                {item.name}
                <TagDots item={item} />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const COLUMNS =
  "grid grid-cols-[minmax(0,1fr)_96px] @min-[520px]:grid-cols-[minmax(0,1fr)_110px_92px] @min-[760px]:grid-cols-[minmax(0,1.1fr)_110px_92px_minmax(0,1.4fr)]";

/** Finder's list view, with the Comments column carrying each project's one-liner. */
export function ListView({ items, selected, onOpen }: ViewProps) {
  const { focused } = useWindow();
  return (
    <div className="px-2 pb-2 text-[13px]">
      <div
        className={`${COLUMNS} sticky top-0 z-10 gap-3 border-b border-separator bg-window px-2 py-1 text-[11px] font-semibold text-secondary-label`}
      >
        <span>Name</span>
        <span>Date</span>
        <span className="hidden @min-[520px]:block">Kind</span>
        <span className="hidden @min-[760px]:block">Comments</span>
      </div>
      <ul className="pt-1">
        {items.map((item, i) => {
          const isSelected = selected === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onOpen(item)}
                className={`${COLUMNS} h-[26px] w-full items-center gap-3 rounded-[6px] px-2 text-left ${
                  isSelected
                    ? focused
                      ? "bg-accent text-white"
                      : "bg-white/15"
                    : i % 2
                      ? "bg-white/[0.035]"
                      : ""
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="size-4 shrink-0">
                    <FileIcon icon={item.icon} size={16} />
                  </span>
                  <span className="truncate">{item.name}</span>
                  <TagDots item={item} />
                </span>
                <span className={`truncate ${isSelected ? "" : "text-secondary-label"}`}>
                  {item.date ?? "--"}
                </span>
                <span className={`hidden truncate @min-[520px]:block ${isSelected ? "" : "text-secondary-label"}`}>
                  {item.kind}
                </span>
                <span className={`hidden truncate @min-[760px]:block ${isSelected ? "" : "text-secondary-label"}`}>
                  {item.comment ?? ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
