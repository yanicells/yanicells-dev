import { experiences, type Experience } from "@/lib/data/experience";

/** Month abbreviation map for parsing date strings */
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

/** Catppuccin accent colors cycled per entry */
const ACCENT_COLORS = [
  { bg: "bg-[var(--ctp-blue)]", text: "text-[var(--ctp-blue)]" },
  { bg: "bg-[var(--ctp-lavender)]", text: "text-[var(--ctp-lavender)]" },
  { bg: "bg-[var(--ctp-teal)]", text: "text-[var(--ctp-teal)]" },
  { bg: "bg-[var(--ctp-green)]", text: "text-[var(--ctp-green)]" },
  { bg: "bg-[var(--ctp-peach)]", text: "text-[var(--ctp-peach)]" },
  { bg: "bg-[var(--ctp-pink)]", text: "text-[var(--ctp-pink)]" },
  { bg: "bg-[var(--ctp-purple)]", text: "text-[var(--ctp-purple)]" },
] as const;

interface ParsedDate {
  monthAbbr: string | null;
  year: number;
  monthIndex: number | null;
}

/** Parses "December 2025" or "2025" into structured data */
function parseStartDate(dateStr: string): ParsedDate {
  const startPart = dateStr.split(" - ")[0].trim();
  const parts = startPart.split(" ");

  if (parts.length === 2) {
    const monthKey = parts[0].toLowerCase();
    const month = MONTHS[monthKey];
    return {
      monthAbbr: month?.abbr ?? null,
      year: parseInt(parts[1], 10),
      monthIndex: month?.index ?? null,
    };
  }

  return {
    monthAbbr: null,
    year: parseInt(parts[0], 10),
    monthIndex: null,
  };
}

/** Calculates human-readable duration from start to now or end date */
function calculateDuration(dateStr: string): string {
  const [startPart, endPart] = dateStr.split(" - ").map((s) => s.trim());
  const isPresent = endPart.toLowerCase() === "present";

  const now = new Date();
  let endDate: Date;

  if (isPresent) {
    endDate = now;
  } else {
    // End part is just a year like "2024"
    const endYear = parseInt(endPart, 10);
    endDate = new Date(endYear, 11, 31); // End of the year
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

/** Groups experiences by their start year */
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

  // Sort years descending (most recent first)
  return Array.from(yearMap.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, entries]) => ({ year, entries }));
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const parsed = parseStartDate(experience.date);
  const isActive = experience.date.toLowerCase().includes("present");
  const duration = calculateDuration(experience.date);

  return (
    <div className="group relative flex gap-4 sm:gap-6">
      {/* Month marker column */}
      <div className="flex w-10 shrink-0 flex-col items-center sm:w-14">
        {parsed.monthAbbr ? (
          <span
            className={`font-mono text-[10px] font-bold tracking-widest sm:text-xs ${accent.text} opacity-70 transition-opacity group-hover:opacity-100`}
          >
            {parsed.monthAbbr}
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 sm:text-xs">
            —
          </span>
        )}
      </div>

      {/* Accent dot + line */}
      <div className="flex flex-col items-center pt-1">
        <div className="relative">
          <div
            className={`size-2.5 rounded-full ${accent.bg} transition-transform group-hover:scale-150`}
          />
          {/* Active pulse ring */}
          {isActive ? (
            <div
              className={`absolute inset-0 size-2.5 animate-ping rounded-full ${accent.bg} opacity-30`}
            />
          ) : null}
        </div>
        {/* Vertical connector */}
        <div className="mt-1 w-px flex-1 bg-border group-last:bg-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8 group-last:pb-0">
        <div className="rounded-lg px-0 py-1 transition-colors sm:px-3 sm:py-2 sm:hover:bg-muted/30">
          {/* Title row */}
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
            <h3 className="text-sm font-semibold text-foreground sm:text-base">
              {experience.title}
            </h3>
            <div className="flex items-center gap-2">
              {/* Duration badge */}
              <span
                className={`rounded-full border border-current/20 px-2 py-0.5 font-mono text-[10px] ${accent.text} opacity-60`}
              >
                {duration}
              </span>
              {/* Active indicator */}
              {isActive ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--ctp-green)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--ctp-green)]">
                  <span className="size-1.5 animate-pulse rounded-full bg-[var(--ctp-green)]" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* Organization */}
          <p className={`mt-0.5 text-xs font-medium sm:text-sm ${accent.text}`}>
            {experience.organization}
          </p>

          {/* Description */}
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {experience.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ExperienceTimeline() {
  const grouped = groupByYear(experiences);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Experience
        </h1>
        <p className="text-sm text-muted-foreground">
          Roles, organizations, and contributions across development and
          leadership.
        </p>
      </div>

      <div className="h-px bg-border" />

      {/* Grouped by year */}
      <div className="flex flex-col gap-10">
        {grouped.map((group) => (
          <section key={group.year}>
            {/* Year marker */}
            <div className="relative mb-6 flex items-center gap-4">
              <span className="font-mono text-4xl font-black text-foreground/10 sm:text-5xl">
                {group.year}
              </span>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            {/* Entries for this year */}
            <div className="flex flex-col">
              {group.entries.map(({ exp, globalIndex }) => (
                <ExperienceCard
                  key={`${exp.title}-${exp.organization}`}
                  experience={exp}
                  index={globalIndex}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
