"use client";

import Image from "next/image";
import { getWriteupBySlug } from "@/lib/data/writeups";
import { DocumentWindow } from "./document-window";

/** One write-up, laid out like a blog post: title, date, a full-width photo, then the text. */
export function WriteupDocument({ slug }: { slug: string }) {
  const writeup = getWriteupBySlug(slug);
  if (!writeup) return <DocumentWindow title="Untitled">This write-up could not be found.</DocumentWindow>;

  return (
    <DocumentWindow title={writeup.title}>
      <h1 className="text-[28px] leading-tight font-bold text-white">{writeup.title}</h1>
      <p className="mt-1 font-mono text-[12px] text-secondary-label">{writeup.date}</p>

      <Image
        src={writeup.image}
        alt={writeup.imageAlt}
        width={1240}
        height={827}
        sizes="620px"
        className="mt-5 aspect-[3/2] h-auto w-full rounded-lg object-cover shadow-[0_0_0_0.5px_rgb(255_255_255/0.15),0_4px_16px_rgb(0_0_0/0.4)]"
        priority
      />

      <div className="mt-6 space-y-4 text-[15px] leading-[1.7]">
        {writeup.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </DocumentWindow>
  );
}
