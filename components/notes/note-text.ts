/** Helpers for turning a note's plain text and timestamps into what Notes shows. */

function lines(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Like Apple Notes, the first line is the title. */
export function noteTitle(text: string) {
  return lines(text)[0] ?? "New Note";
}

export function notePreview(text: string) {
  return lines(text)[1] ?? "No additional text";
}

const DAY = 24 * 60 * 60 * 1000;

function startOfDay(time: number) {
  const date = new Date(time);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

/** The list's section headers: Today, Yesterday, Previous 7/30 Days, then by month. */
export function sectionFor(time: number, now = Date.now()) {
  const days = Math.round((startOfDay(now) - startOfDay(time)) / DAY);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days <= 7) return "Previous 7 Days";
  if (days <= 30) return "Previous 30 Days";
  return new Date(time).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** Time for today's notes ("15:53"), a short date for older ones ("9/11/26"). */
export function listTime(time: number, now = Date.now()) {
  if (startOfDay(time) === startOfDay(now)) {
    return new Date(time).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
  return new Date(time).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" });
}

/** The editor's header: "September 26, 2026 at 15:53". */
export function editorDate(time: number) {
  const date = new Date(time);
  const day = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const clock = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${day} at ${clock}`;
}
