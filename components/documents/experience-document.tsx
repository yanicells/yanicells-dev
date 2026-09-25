"use client";

import { experiences } from "@/lib/data/experience";
import { useDesktop } from "@/components/desktop/desktop-context";
import { DocumentWindow, PushButton } from "./document-window";

/** "Experience": work, orgs, and school, newest first, straight from the data file. */
export function ExperienceDocument() {
  const { open } = useDesktop();

  return (
    <DocumentWindow
      title="Experience"
      actions={
        <PushButton onClick={() => open({ kind: "web", doc: "resume" })}>Resume</PushButton>
      }
    >
      <h1 className="text-[26px] leading-tight font-bold text-white">Experience</h1>
      <p className="mt-1 text-secondary-label">Work, orgs, and school.</p>

      <ol className="mt-6 divide-y divide-separator border-y border-separator">
        {experiences.map((item) => (
          <li key={`${item.title}-${item.organization}`} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h2 className="font-semibold text-white">{item.title}</h2>
              <span className="text-[12px] text-secondary-label tabular-nums">{item.date}</span>
            </div>
            <p className="text-[13px] text-secondary-label">
              {item.organization}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            <p className="mt-1.5 text-[13.5px]">{item.description}</p>
          </li>
        ))}
      </ol>
    </DocumentWindow>
  );
}
