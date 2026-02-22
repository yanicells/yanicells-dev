"use client";

import { experiences, type Experience } from "@/lib/data/experience";

// ─── Shared Utilities ───────────────────────────────────────────────────────

const MONTHS: Record<string, { abbr: string; index: number }> = {
  january: { abbr: "JAN", index: 0 },
  february: { abbr: "FEB", index: 1 },
  march: { abbr: "MAR", index: 2 },
  april: { abbr: "APR", index: 3 },
  may: { abbr: "MAY", index: 4 },
  june: { abbr: "JUN", index: 5 },
  july: { abbr: "JUL", index: 6 },
  august: { abbr: "AUG", index: 7 },
  september: { abbr: "SEP", index: 8 },
  october: { abbr: "OCT", index: 9 },
  november: { abbr: "NOV", index: 10 },
  december: { abbr: "DEC", index: 11 },
};

const ACCENT_COLORS = [
  {
    bg: "bg-[var(--ctp-blue)]",
    text: "text-[var(--ctp-blue)]",
    hex: "var(--ctp-blue)",
  },
  {
    bg: "bg-[var(--ctp-lavender)]",
    text: "text-[var(--ctp-lavender)]",
    hex: "var(--ctp-lavender)",
  },
  {
    bg: "bg-[var(--ctp-teal)]",
    text: "text-[var(--ctp-teal)]",
    hex: "var(--ctp-teal)",
  },
  {
    bg: "bg-[var(--ctp-green)]",
    text: "text-[var(--ctp-green)]",
    hex: "var(--ctp-green)",
  },
  {
    bg: "bg-[var(--ctp-peach)]",
    text: "text-[var(--ctp-peach)]",
    hex: "var(--ctp-peach)",
  },
  {
    bg: "bg-[var(--ctp-pink)]",
    text: "text-[var(--ctp-pink)]",
    hex: "var(--ctp-pink)",
  },
  {
    bg: "bg-[var(--ctp-purple)]",
    text: "text-[var(--ctp-purple)]",
    hex: "var(--ctp-purple)",
  },
  {
    bg: "bg-[var(--ctp-mint)]",
    text: "text-[var(--ctp-mint)]",
    hex: "var(--ctp-mint)",
  },
] as const;

interface ParsedDate {
  monthAbbr: string | null;
  monthFull: string | null;
  year: number;
  monthIndex: number | null;
}

function parseStartDate(dateStr: string): ParsedDate {
  const startPart = dateStr.split(" - ")[0].trim();
  const parts = startPart.split(" ");

  if (parts.length === 2) {
    const monthKey = parts[0].toLowerCase();
    const month = MONTHS[monthKey];
    return {
      monthAbbr: month?.abbr ?? null,
      monthFull: parts[0],
      year: parseInt(parts[1], 10),
      monthIndex: month?.index ?? null,
    };
  }

  return {
    monthAbbr: null,
    monthFull: null,
    year: parseInt(parts[0], 10),
    monthIndex: null,
  };
}

function parseEndDate(dateStr: string): { label: string; isPresent: boolean } {
  const endPart = dateStr.split(" - ")[1]?.trim() ?? "";
  const isPresent = endPart.toLowerCase() === "present";
  return { label: isPresent ? "Present" : endPart, isPresent };
}

function calculateDuration(dateStr: string): string {
  const [startPart, endPart] = dateStr.split(" - ").map((s) => s.trim());
  const isPresent = endPart.toLowerCase() === "present";

  const now = new Date();
  let endDate: Date;

  if (isPresent) {
    endDate = now;
  } else {
    const endParts = endPart.split(" ");
    if (endParts.length === 2) {
      const monthKey = endParts[0].toLowerCase();
      const month = MONTHS[monthKey];
      endDate = new Date(parseInt(endParts[1], 10), month?.index ?? 11, 1);
    } else {
      const endYear = parseInt(endPart, 10);
      endDate = new Date(endYear, 11, 31);
    }
  }

  const startParts = startPart.split(" ");
  let startDate: Date;

  if (startParts.length === 2) {
    const monthKey = startParts[0].toLowerCase();
    const month = MONTHS[monthKey];
    startDate = new Date(parseInt(startParts[1], 10), month?.index ?? 0, 1);
  } else {
    startDate = new Date(parseInt(startParts[0], 10), 0, 1);
  }

  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  if (totalMonths < 1) return "< 1 mo";

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} mo`;
  if (months === 0) return `${years} yr`;
  return `${years} yr ${months} mo`;
}

function groupByYear(
  items: Experience[],
): { year: number; entries: { exp: Experience; globalIndex: number }[] }[] {
  const yearMap = new Map<number, { exp: Experience; globalIndex: number }[]>();

  items.forEach((exp, i) => {
    const parsed = parseStartDate(exp.date);
    const existing = yearMap.get(parsed.year);
    if (existing) {
      existing.push({ exp, globalIndex: i });
    } else {
      yearMap.set(parsed.year, [{ exp, globalIndex: i }]);
    }
  });

  return Array.from(yearMap.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, entries]) => ({ year, entries }));
}

// ─── DESIGN 2: "Alternating Spine" (with compact/expand on hover) ───────────
// A centered vertical spine with cards alternating left and right.
// Cards are compact by default — showing only title, org, month, and duration.
// On hover, the description expands into view.

function Design2() {
  const grouped = groupByYear(experiences);
  let counter = 0;

  return (
    <section className="flex flex-col gap-6">
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-border/50 sm:left-1/2 sm:-translate-x-px" />

        {grouped.map((group) => (
          <div key={group.year}>
            {/* ── Year marker on the spine ── */}
            <div className="relative flex items-center pt-2 pb-20">
              <div className="absolute left-4 top-1/2 -translate-x-1/2 sm:left-1/2">
                <div className="flex h-10 w-20 items-center justify-center rounded-full border-2 border-[var(--ctp-lavender)]/40 bg-background">
                  <span className="font-mono text-lg font-black tracking-tight text-foreground">
                    {group.year}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Entries ── */}
            {group.entries.map(({ exp, globalIndex }) => {
              const accent = ACCENT_COLORS[globalIndex % ACCENT_COLORS.length];
              const parsed = parseStartDate(exp.date);
              const end = parseEndDate(exp.date);
              const duration = calculateDuration(exp.date);
              const isLeft = counter % 2 === 0;
              counter++;

              return (
                <div
                  key={`${exp.title}-${exp.organization}`}
                  className="relative flex items-start py-2"
                >
                  {/* ─ Card ─ */}
                  <div className="ml-12 flex-1 sm:ml-0">
                    <div
                      className={`sm:w-[calc(50%-2rem)] ${
                        isLeft
                          ? "sm:mr-auto sm:pr-6 sm:text-right"
                          : "sm:ml-auto sm:pl-6"
                      }`}
                    >
                      <div className="group rounded-lg border border-border/40 bg-card/50 px-4 py-3 transition-all hover:border-border hover:bg-card/80">
                        {/* Compact row: title + status */}
                        <div
                          className={`flex flex-wrap items-baseline gap-2 ${isLeft ? "sm:justify-end" : ""}`}
                        >
                          <h3 className="text-sm font-semibold text-foreground">
                            {exp.title}
                          </h3>
                          {end.isPresent && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--ctp-green)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--ctp-green)]">
                              <span className="size-1.5 animate-pulse rounded-full bg-[var(--ctp-green)]" />
                              Active
                            </span>
                          )}
                        </div>

                        {/* Compact row: org + duration */}
                        <div
                          className={`mt-0.5 flex flex-wrap items-baseline gap-x-2 ${isLeft ? "sm:justify-end" : ""}`}
                        >
                          <p className={`text-xs font-medium ${accent.text}`}>
                            {exp.organization}
                          </p>
                          <span className="font-mono text-[10px] text-muted-foreground/50">
                            · {duration}
                          </span>
                        </div>

                        {/* Description — shows 3 lines by default, full on card hover */}
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-3 transition-all group-hover:line-clamp-none sm:text-sm">
                          {exp.description}
                        </p>
                        <p className="mt-1 font-mono text-[10px] text-muted-foreground/40">
                          {exp.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ─ Spine node (month + dot) ─ */}
                  <div className="pointer-events-none absolute left-4 top-4 z-10 -translate-x-1/2 sm:left-1/2">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`size-3 rounded-full ${accent.bg}`} />
                      <span
                        className={`font-mono text-[9px] font-bold tracking-wider ${accent.text} opacity-70`}
                      >
                        {parsed.monthAbbr ?? "—"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── DESIGN 5: "Editorial" ──────────────────────────────────────────────────
// Clean, typographic-first timeline. Year headers are bold but measured.
// Ruled lines separate entries. Month labels sit in a dedicated column.

function Design5() {
  const grouped = groupByYear(experiences);

  return (
    <section className="flex flex-col gap-6">
      {/* Section label */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 items-center rounded-md bg-[var(--ctp-peach)]/10 px-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--ctp-peach)]">
            Design 5 — Editorial
          </span>
        </div>
        <div className="h-px flex-1 bg-border/30" />
      </div>

      {grouped.map((group, gi) => (
        <div key={group.year}>
          {/* ── Year header ── */}
          <div className="flex items-end gap-4 py-3">
            <span className="font-mono text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              {group.year}
            </span>
            <div className="mb-1.5 flex items-center gap-2">
              <div className="h-px w-6 bg-[var(--ctp-peach)]/40" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                {group.entries.length}{" "}
                {group.entries.length > 1 ? "entries" : "entry"}
              </span>
            </div>
          </div>

          {/* ── Entries with ruled lines ── */}
          <div className="flex flex-col">
            {group.entries.map(({ exp, globalIndex }) => {
              const accent = ACCENT_COLORS[globalIndex % ACCENT_COLORS.length];
              const parsed = parseStartDate(exp.date);
              const end = parseEndDate(exp.date);
              const duration = calculateDuration(exp.date);

              return (
                <div
                  key={`${exp.title}-${exp.organization}`}
                  className="group border-t border-border/30 py-5 transition-colors hover:bg-muted/5"
                >
                  {/* Top row: month + title + meta */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                    {/* Month label */}
                    <div className="flex shrink-0 items-center gap-2 sm:w-24">
                      <span
                        className={`font-mono text-xs font-bold tracking-widest ${accent.text}`}
                      >
                        {parsed.monthAbbr ?? "—"}
                      </span>
                      <div
                        className={`hidden h-px w-4 sm:block ${accent.bg} opacity-30`}
                      />
                    </div>

                    {/* Title */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-base font-semibold text-foreground sm:text-lg">
                          {exp.title}
                        </h3>
                        {end.isPresent && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--ctp-green)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--ctp-green)]">
                            <span className="size-1.5 animate-pulse rounded-full bg-[var(--ctp-green)]" />
                            Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="shrink-0">
                      <span className="font-mono text-xs text-muted-foreground/40">
                        {duration}
                      </span>
                    </div>
                  </div>

                  {/* Organization + description */}
                  <div className="mt-2 sm:pl-[calc(6rem+1.5rem)]">
                    <p
                      className={`text-sm font-medium ${accent.text} opacity-80`}
                    >
                      {exp.organization}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    {/* Date range */}
                    <p className="mt-2 font-mono text-[10px] text-muted-foreground/30">
                      {exp.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Year bottom space */}
          {gi < grouped.length - 1 && <div className="pb-4" />}
        </div>
      ))}

      {/* Footer timeline indicator */}
      <div className="flex items-center gap-3 border-t border-border/20 pt-4">
        <div className="size-1.5 rounded-full bg-[var(--ctp-peach)]/30" />
        <div className="h-px flex-1 bg-gradient-to-r from-border/40 to-transparent" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/30">
          Timeline
        </span>
      </div>
    </section>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function ExperienceTimeline() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Experience
        </h1>
        <p className="text-sm text-muted-foreground">
          Roles, organizations, and contributions across development and
          leadership.
        </p>
      </div>

      {/* Active design */}
      <Design2 />

      {/* Design 5 (Editorial) — commented out for now */}
      {/* <Design5 /> */}
    </div>
  );
}
