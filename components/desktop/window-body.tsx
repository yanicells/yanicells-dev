"use client";

import { FinderWindow } from "@/components/finder/finder-window";
import { AboutDocument } from "@/components/documents/about-document";
import { ExperienceDocument } from "@/components/documents/experience-document";
import { ProjectDocument } from "@/components/documents/project-document";
import { WriteupDocument } from "@/components/documents/writeup-document";
import { PhotoViewer } from "@/components/preview/photo-viewer";
import { WebDocument } from "@/components/preview/web-document";
import { ContactCard } from "@/components/contacts/contact-card";
import type { WindowState } from "./window-manager";

/** Picks the app view for a window's content. */
export function WindowBody({ win }: { win: WindowState }) {
  const { content } = win;
  switch (content.kind) {
    case "finder":
      return <FinderWindow id={win.id} content={content} />;
    case "about":
      return <AboutDocument />;
    case "experience":
      return <ExperienceDocument />;
    case "project":
      return <ProjectDocument slug={content.slug} />;
    case "writeup":
      return <WriteupDocument slug={content.slug} />;
    case "photo":
      return <PhotoViewer index={content.index} />;
    case "web":
      return <WebDocument doc={content.doc} />;
    case "contact":
      return <ContactCard />;
  }
}
