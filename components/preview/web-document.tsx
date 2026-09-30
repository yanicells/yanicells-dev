"use client";

import { ArrowUpRight } from "lucide-react";
import { useWindow } from "@/components/desktop/desktop-context";
import { Toolbar, TrafficLights } from "@/components/desktop/window-chrome";

const DOCS = {
  resume: { title: "Resume", url: "https://resume.yanicells.dev" },
  cv: { title: "CV", url: "https://cv.yanicells.dev" },
} as const;

/** Preview showing the hosted resume or CV, embedded in the window. */
export function WebDocument({ doc }: { doc: keyof typeof DOCS }) {
  const { focused } = useWindow();
  const { title, url } = DOCS[doc];

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#181818]">
      <Toolbar title={title} leading={<TrafficLights />}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="toolbar-button flex items-center gap-1 px-3 text-[13px]"
        >
          Open in new tab
          <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
        </a>
      </Toolbar>
      <div className="relative min-h-0 flex-1 bg-white">
        <iframe src={url} title={title} className="size-full border-0" />
        {/* Clicks inside an iframe never reach the window, so a background
            window catches its first click here to come forward. */}
        {!focused && <div className="absolute inset-0" />}
      </div>
    </div>
  );
}
