"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useMutation, useQuery } from "convex/react";
import {
  CircleCheck,
  Ellipsis,
  Paperclip,
  PanelLeft,
  PenLine,
  Search,
  Share,
  Sparkles,
  SquarePen,
  Table,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useWindow } from "@/components/desktop/desktop-context";
import { TrafficLights } from "@/components/desktop/window-chrome";
import { ActiveNote } from "./active-note";
import { NoteEditor } from "./note-editor";
import { NotesList, type ListNote } from "./notes-list";
import { editorDate } from "./note-text";

const WELCOME_KEY = "welcome";
const WELCOME_TEXT = `Leave me a note!
Hey, it's Yani. Say hi, share feedback, or tell me about an opportunity.

Hit the compose button up top to start a new note. It saves as you type, and only you and I can see the notes you write here.`;

interface Active {
  /** Stable per opened note, so the editor never remounts mid-typing. */
  key: string;
  id: Id<"notes"> | null;
  /** When it was opened; dates a draft until it's saved. */
  openedAt: number;
}

function CircleButton({ label, onClick, children }: { label: string; onClick?: () => void; children: ReactNode }) {
  const className =
    "toolbar-button flex size-[34px] shrink-0 items-center justify-center transition-colors hover:bg-white/16 active:bg-white/24";
  // Buttons Notes has but this portfolio doesn't need are drawn, not wired;
  // they still respond to hover so the toolbar feels alive.
  if (!onClick) {
    return (
      <span aria-hidden data-no-drag className={`${className} text-secondary-label hover:text-label`}>
        {children}
      </span>
    );
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

/**
 * Notes, where visitors leave notes for Yani. Mirrors Apple Notes: a
 * pinned welcome note, the visitor's own notes grouped by date, and an
 * editor whose first line is the title.
 */
export function NotesWindow({ clientId }: { clientId: string }) {
  const { focused } = useWindow();
  const notes = useQuery(api.notes.list, { clientId });
  const remove = useMutation(api.notes.remove);

  const [active, setActive] = useState<Active>({ key: WELCOME_KEY, id: null, openedAt: 0 });
  const [showList, setShowList] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draftCount, setDraftCount] = useState(0);

  const isDraft = active.key !== WELCOME_KEY && !active.id;
  const current = active.id ? notes?.find((note) => note._id === active.id) : undefined;

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [menuOpen]);

  const open = (next: Omit<Active, "openedAt">) => {
    setError(null);
    setMenuOpen(false);
    setActive({ ...next, openedAt: Date.now() });
  };

  const compose = () => {
    setDraftCount((n) => n + 1);
    open({ key: `draft-${draftCount + 1}`, id: null });
  };

  const select = (key: string) => {
    if (key === WELCOME_KEY) return open({ key, id: null });
    const note = notes?.find((n) => n._id === key);
    if (note && note._id !== active.id) open({ key: note._id, id: note._id });
  };

  const deleteNote = async () => {
    const id = active.id;
    open({ key: WELCOME_KEY, id: null });
    if (id) await remove({ id, clientId }).catch(() => {});
  };

  const listNotes: ListNote[] = (notes ?? []).map((note) => ({
    key: note._id,
    text: note.text,
    updatedAt: note.updatedAt,
  }));
  if (isDraft) listNotes.unshift({ key: active.key, text: "", updatedAt: active.openedAt });

  const noteCount = (notes?.length ?? 0) + 1;
  const headerTime = current?.updatedAt ?? active.openedAt;

  return (
    <div className="@container flex h-full min-h-0 flex-col bg-window">
      <header
        data-drag-handle
        className="flex h-[52px] shrink-0 items-center border-b border-black/70 bg-[#262626] pr-3"
      >
        <div
          className={`flex h-full shrink-0 items-center gap-3 pl-4 ${showList ? "w-[clamp(200px,32%,260px)] pr-2" : "pr-3"}`}
        >
          <span data-no-drag>
            <TrafficLights />
          </span>
          <CircleButton label="Toggle note list" onClick={() => setShowList((v) => !v)}>
            <PanelLeft className="size-[17px]" strokeWidth={1.8} />
          </CircleButton>
          <div className={`min-w-0 flex-1 leading-tight ${focused ? "" : "opacity-50"}`}>
            <p className="truncate text-[14px] font-semibold text-white">For Yani</p>
            <p className="text-[12px] text-secondary-label">
              {noteCount} {noteCount === 1 ? "note" : "notes"}
            </p>
          </div>
          {showList && (
            <CircleButton label="Folder options">
              <Ellipsis className="size-[18px]" />
            </CircleButton>
          )}
        </div>

        <div className={`flex min-w-0 flex-1 items-center gap-2 pl-2 ${focused ? "" : "opacity-60"}`}>
          <CircleButton label="New Note" onClick={compose}>
            <SquarePen className="size-[17px]" strokeWidth={1.8} />
          </CircleButton>
          <div className="flex-1" />
          <span
            aria-hidden
            data-no-drag
            className="toolbar-button hidden items-center gap-0.5 px-1 text-secondary-label @min-[760px]:flex"
          >
            {[
              <span key="aa" className="text-[16px] font-medium">Aa</span>,
              <CircleCheck key="check" className="size-[17px]" strokeWidth={1.8} />,
              <Table key="table" className="size-[17px]" strokeWidth={1.8} />,
              <Paperclip key="clip" className="size-[17px]" strokeWidth={1.8} />,
              <PenLine key="pen" className="size-[17px]" strokeWidth={1.8} />,
              <Sparkles key="sparkles" className="size-[17px]" strokeWidth={1.8} />,
            ].map((icon) => (
              <span
                key={icon.key}
                className="flex h-[26px] min-w-[34px] items-center justify-center rounded-full px-1.5 transition-colors hover:bg-white/14 hover:text-label active:bg-white/22"
              >
                {icon}
              </span>
            ))}
          </span>
          <div className="flex-1" />
          <span className="hidden @min-[560px]:flex">
            <CircleButton label="Share">
              <Share className="size-[17px]" strokeWidth={1.8} />
            </CircleButton>
          </span>
          <div className="relative" onPointerDown={(event) => event.stopPropagation()}>
            <CircleButton label="More" onClick={() => setMenuOpen((v) => !v)}>
              <Ellipsis className="size-[18px]" />
            </CircleButton>
            {menuOpen && (
              <div className="glass-raised absolute top-[calc(100%+6px)] right-0 z-10 w-44 animate-menu-in rounded-[10px] p-[5px]">
                <button
                  type="button"
                  disabled={!active.id}
                  onClick={deleteNote}
                  className="flex h-[22px] w-full items-center rounded-[5px] px-2.5 text-left text-[13px] text-white enabled:hover:bg-accent disabled:text-white/30"
                >
                  Delete Note
                </button>
              </div>
            )}
          </div>
          <CircleButton label="Search">
            <Search className="size-[17px]" strokeWidth={1.8} />
          </CircleButton>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {showList && (
          <div className="w-[clamp(200px,32%,260px)] shrink-0 border-r border-black/60">
            <NotesList
              pinned={{ key: WELCOME_KEY, text: WELCOME_TEXT, updatedAt: 0 }}
              notes={listNotes}
              selectedKey={active.id ?? active.key}
              onSelect={select}
            />
          </div>
        )}

        <div className="min-w-0 flex-1 overflow-y-auto px-8 pt-3">
          <p className="mb-4 text-center text-[12px] text-tertiary-label">
            {active.key === WELCOME_KEY ? "Pinned" : headerTime ? editorDate(headerTime) : ""}
          </p>
          {error && <p className="mb-3 text-center text-[12px] text-[#ff6961]">{error}</p>}
          {active.key === WELCOME_KEY ? (
            <NoteEditor key={WELCOME_KEY} initialText={WELCOME_TEXT} readOnly />
          ) : (
            <ActiveNote
              key={active.key}
              clientId={clientId}
              initialId={active.id}
              initialText={current?.text ?? ""}
              onCreated={(id) => setActive((a) => (a.key === active.key ? { ...a, id } : a))}
              onError={setError}
            />
          )}
        </div>
      </div>
    </div>
  );
}
