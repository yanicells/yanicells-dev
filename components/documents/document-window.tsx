"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Toolbar, TrafficLights } from "@/components/desktop/window-chrome";

/** A TextEdit-style window: the uniform toolbar over a scrolling page. */
export function DocumentWindow({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-window">
      <Toolbar title={title} leading={<TrafficLights />}>
        {actions}
      </Toolbar>
      <div className="selectable min-h-0 flex-1 overflow-y-auto">
        <article className="mx-auto max-w-[620px] px-7 pt-7 pb-12 text-[14px] leading-[1.6] text-label">
          {children}
        </article>
      </div>
    </div>
  );
}

const BUTTON =
  "inline-flex h-7 items-center gap-1 rounded-full px-3.5 text-[13px] font-medium shadow-[inset_0_0.5px_0_rgb(255_255_255/0.2),0_0_0_0.5px_rgb(0_0_0/0.5),0_1px_2px_rgb(0_0_0/0.3)]";

/** A capsule push button that leaves the site, so it says so with an arrow. */
export function LinkButton({
  href,
  primary,
  children,
}: {
  href: string;
  primary?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`${BUTTON} ${primary ? "bg-accent text-white" : "bg-white/10 text-label hover:bg-white/15"}`}
    >
      {children}
      {!href.startsWith("mailto:") && <ArrowUpRight className="size-3.5" strokeWidth={2.2} />}
    </a>
  );
}

/** A capsule push button that opens something in another window. */
export function PushButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} className={`${BUTTON} bg-white/10 text-label hover:bg-white/15`}>
      {children}
    </button>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mt-9 mb-3 text-[17px] font-semibold text-white">{children}</h2>;
}
