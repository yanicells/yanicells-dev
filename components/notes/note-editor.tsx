"use client";

import { useEffect, useRef } from "react";

/**
 * The note body: one plain-text editable area whose first line is styled as
 * the title, like Apple Notes. Uncontrolled on purpose (React re-rendering a
 * contentEditable would reset the caret), so remount it with a `key` to
 * switch notes.
 */
export function NoteEditor({
  initialText,
  readOnly,
  autoFocus,
  onChange,
}: {
  initialText: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  onChange?: (text: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerText = initialText;
    if (autoFocus) el.focus();
    // Only on mount: the editor owns its text from here on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      role="textbox"
      aria-multiline
      aria-label="Note"
      contentEditable={readOnly ? false : "plaintext-only"}
      suppressContentEditableWarning
      onInput={(event) => onChange?.(event.currentTarget.innerText)}
      className="selectable min-h-full pb-10 text-[14px] leading-[1.55] whitespace-pre-wrap text-label caret-[#ffd60a] outline-none first-line:text-[22px] first-line:leading-[1.4] first-line:font-bold first-line:text-white empty:before:text-tertiary-label empty:before:content-['Title']"
    />
  );
}
