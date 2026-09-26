"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { NoteEditor } from "./note-editor";

const SAVE_DELAY_MS = 400;

export function errorMessage(error: unknown) {
  return error instanceof ConvexError ? String(error.data) : "Couldn't save this note. Try again in a bit.";
}

/**
 * The open note, which saves itself like Apple Notes: the first keystroke
 * creates it, later edits save after a short pause, and leaving a note
 * saves any pending edit, or deletes the note if it was left empty.
 * Mount one per note (keyed), so this state never leaks between notes.
 */
export function ActiveNote({
  clientId,
  initialId,
  initialText,
  onCreated,
  onError,
}: {
  clientId: string;
  initialId: Id<"notes"> | null;
  initialText: string;
  onCreated: (id: Id<"notes">) => void;
  onError: (message: string | null) => void;
}) {
  const create = useMutation(api.notes.create);
  const update = useMutation(api.notes.update);
  const remove = useMutation(api.notes.remove);

  const id = useRef(initialId);
  const text = useRef(initialText);
  const dirty = useRef(false);
  const creating = useRef<Promise<Id<"notes">> | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Resolves the note's ID, waiting for its creation if that's in flight.
  const noteId = async () => id.current ?? (await creating.current) ?? null;

  const save = async () => {
    const target = await noteId();
    if (!target || !dirty.current) return;
    dirty.current = false;
    await update({ id: target, clientId, text: text.current });
  };

  const handleChange = (next: string) => {
    text.current = next;
    dirty.current = true;
    onError(null);

    if (!id.current && !creating.current) {
      if (!next.trim()) return;
      dirty.current = false;
      creating.current = create({ clientId, text: next });
      creating.current
        .then((created) => {
          id.current = created;
          onCreated(created);
        })
        .catch((error) => onError(errorMessage(error)))
        .finally(() => (creating.current = null));
      return;
    }

    clearTimeout(timer.current);
    timer.current = setTimeout(() => save().catch((error) => onError(errorMessage(error))), SAVE_DELAY_MS);
  };

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      const leave = async () => {
        const target = await noteId();
        if (!target) return;
        if (!text.current.trim()) await remove({ id: target, clientId });
        else await save();
      };
      // Leaving can race a delete from the menu; either way there's nothing left to do.
      leave().catch(() => {});
    },
    // Runs once, on leaving the note; the refs hold the latest state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <NoteEditor initialText={initialText} autoFocus={!initialId} onChange={handleChange} />;
}
