"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photoCollection } from "@/lib/data/photos";
import { useDesktop, useWindow } from "@/components/desktop/desktop-context";
import { Toolbar, TrafficLights } from "@/components/desktop/window-chrome";

/** Preview showing one photo, with previous/next through the Photos folder. */
export function PhotoViewer({ index }: { index: number }) {
  const { dispatch } = useDesktop();
  const { id, focused } = useWindow();
  const photo = photoCollection[index];
  const count = photoCollection.length;

  // Arrow keys page through photos, like Preview with a folder of images open.
  useEffect(() => {
    if (!focused) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const step = event.key === "ArrowLeft" ? -1 : 1;
      dispatch({ type: "photo", id, index: (index + step + count) % count });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focused, dispatch, id, index, count]);

  const step = (delta: number) =>
    dispatch({ type: "photo", id, index: (index + delta + count) % count });

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#181818]">
      <Toolbar title={photo.alt} leading={<TrafficLights />}>
        <span className="text-[12px] text-secondary-label tabular-nums">
          {index + 1} of {count}
        </span>
        <div className="toolbar-button flex items-center px-0.5">
          <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className="flex h-full w-8 items-center justify-center">
            <ChevronLeft className="size-[18px]" strokeWidth={2} />
          </button>
          <button type="button" aria-label="Next photo" onClick={() => step(1)} className="flex h-full w-8 items-center justify-center">
            <ChevronRight className="size-[18px]" strokeWidth={2} />
          </button>
        </div>
      </Toolbar>
      <div className="relative min-h-0 flex-1">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, 900px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
