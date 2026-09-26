"use client";

import { useDesktop } from "./desktop-context";
import { DESKTOP_ITEMS } from "@/components/finder/finder-data";
import { FileIcon } from "@/components/finder/file-icons";

/**
 * Desktop items, stacked from the top-right corner like a default Mac.
 * On phones they become a four-column home screen grid.
 * A single click opens the item; the last one clicked stays highlighted.
 */
export function DesktopIcons({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const { openItem } = useDesktop();

  return (
    <ul
      aria-label="Desktop"
      className="grid grid-cols-4 gap-y-4 sm:absolute sm:top-[calc(var(--menubar-h)+10px)] sm:right-2.5 sm:bottom-(--dock-space) sm:flex sm:flex-col sm:flex-wrap-reverse sm:content-start sm:gap-y-1"
    >
      {DESKTOP_ITEMS.map((item) => {
        const isSelected = selected === item.id;
        return (
          <li key={item.id}>
            <button
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => {
                onSelect(item.id);
                openItem(item);
              }}
              className="flex w-[90px] flex-col items-center gap-1 rounded-md py-1 outline-accent focus-visible:outline-2 max-sm:w-full"
            >
              <span
                className={`size-[64px] rounded-[6px] p-[3px] ${
                  isSelected ? "bg-white/15 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]" : ""
                }`}
              >
                <FileIcon icon={item.icon} size={58} />
              </span>
              <span
                className={`max-w-full rounded-[4px] px-1 text-center text-[12px] leading-[15px] font-medium text-white ${
                  isSelected ? "bg-accent" : "[text-shadow:0_1px_2px_rgb(0_0_0/0.8)]"
                }`}
              >
                {item.name}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
