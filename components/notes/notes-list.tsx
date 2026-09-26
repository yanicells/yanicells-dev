"use client";

import { listTime, notePreview, noteTitle, sectionFor } from "./note-text";

export interface ListNote {
  key: string;
  text: string;
  updatedAt: number;
}

function Row({
  title,
  meta,
  preview,
  selected,
  onSelect,
}: {
  title: string;
  meta?: string;
  preview: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={`w-full rounded-[8px] px-4 py-2 text-left ${selected ? "bg-white/12" : ""}`}
      >
        <p className="truncate text-[13px] font-bold text-white">{title}</p>
        <p className="truncate text-[12px]">
          {meta && <span className="mr-2 text-label">{meta}</span>}
          <span className="text-secondary-label">{preview}</span>
        </p>
      </button>
    </li>
  );
}

function SectionHeader({ first, children }: { first?: boolean; children: React.ReactNode }) {
  return (
    <h3
      className={`mx-2 mb-1.5 border-b border-separator px-2 pb-2 text-[15px] font-bold text-white ${
        first ? "mt-2" : "mt-4"
      }`}
    >
      {children}
    </h3>
  );
}

/**
 * The middle column of Notes: a pinned note on top, then the visitor's notes
 * grouped under Today, Previous 7 Days, and so on.
 */
export function NotesList({
  pinned,
  notes,
  selectedKey,
  onSelect,
}: {
  pinned: ListNote;
  notes: ListNote[];
  selectedKey: string;
  onSelect: (key: string) => void;
}) {
  const sections = new Map<string, ListNote[]>();
  for (const note of notes) {
    const section = sectionFor(note.updatedAt);
    sections.set(section, [...(sections.get(section) ?? []), note]);
  }

  return (
    <nav className="h-full overflow-y-auto px-2 pb-4">
      <SectionHeader first>Pinned</SectionHeader>
      <ul>
        <Row
          title={noteTitle(pinned.text)}
          preview={notePreview(pinned.text)}
          selected={selectedKey === pinned.key}
          onSelect={() => onSelect(pinned.key)}
        />
      </ul>
      {[...sections].map(([section, items]) => (
        <section key={section}>
          <SectionHeader>{section}</SectionHeader>
          <ul>
            {items.map((note) => (
              <Row
                key={note.key}
                title={noteTitle(note.text)}
                meta={listTime(note.updatedAt)}
                preview={notePreview(note.text)}
                selected={selectedKey === note.key}
                onSelect={() => onSelect(note.key)}
              />
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
