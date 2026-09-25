"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useDesktop } from "@/components/desktop/desktop-context";
import { Toolbar, TrafficLights } from "@/components/desktop/window-chrome";
import { LinkButton } from "@/components/documents/document-window";

const EMAIL = "edrianmiguelcapistrano@gmail.com";

const LINKS: { label: string; text: string; href: string }[] = [
  { label: "GitHub", text: "github.com/yanicells", href: "https://github.com/yanicells" },
  { label: "LinkedIn", text: "linkedin.com/in/yanicells", href: "https://www.linkedin.com/in/yanicells" },
  { label: "Instagram", text: "@yahneyy", href: "https://www.instagram.com/yahneyy" },
];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="contents">
      <dt className="text-right text-[12px] leading-6 text-secondary-label">{label}</dt>
      <dd className="min-w-0 truncate leading-6">{children}</dd>
    </div>
  );
}

const VALUE_LINK = "text-label hover:text-accent hover:underline";

/** Contacts showing Yani's card: email, profiles, and the resume and CV. */
export function ContactCard() {
  const { open } = useDesktop();

  return (
    <div className="flex h-full min-h-0 flex-col bg-window">
      <Toolbar title="Contact" leading={<TrafficLights />} />
      <div className="selectable min-h-0 flex-1 overflow-y-auto px-6 pt-7 pb-8 text-[13px]">
        <header className="flex flex-col items-center text-center">
          <Image
            src="/avatar.jpg"
            alt="Yani"
            width={96}
            height={96}
            loading="eager"
            className="size-24 rounded-full object-cover shadow-[0_0_0_0.5px_rgb(255_255_255/0.2)]"
          />
          <h1 className="mt-3 text-[22px] leading-tight font-bold text-white">
            Edrian Miguel E. Capistrano
          </h1>
          <p className="text-secondary-label">Yani · Computer Science, Ateneo de Manila University</p>
          <div className="mt-4">
            <LinkButton href={`mailto:${EMAIL}`} primary>
              Email me
            </LinkButton>
          </div>
        </header>

        <dl className="mx-auto mt-7 grid max-w-[360px] grid-cols-[76px_minmax(0,1fr)] gap-x-3 border-t border-separator pt-4">
          <Field label="email">
            <a href={`mailto:${EMAIL}`} className={VALUE_LINK}>
              {EMAIL}
            </a>
          </Field>
          {LINKS.map((link) => (
            <Field key={link.label} label={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={VALUE_LINK}>
                {link.text}
              </a>
            </Field>
          ))}
          <Field label="resume">
            <button type="button" onClick={() => open({ kind: "web", doc: "resume" })} className={VALUE_LINK}>
              resume.yanicells.dev
            </button>
          </Field>
          <Field label="CV">
            <button type="button" onClick={() => open({ kind: "web", doc: "cv" })} className={VALUE_LINK}>
              cv.yanicells.dev
            </button>
          </Field>
        </dl>
      </div>
    </div>
  );
}
