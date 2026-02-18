"use client";

import { useState } from "react";
import Image from "next/image";
import type {
  MusicPageData,
  SerializedTrack,
  SerializedArtist,
  GenreData,
  TimeRange,
} from "@/lib/spotify";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "short_term", label: "Last Month" },
  { value: "medium_term", label: "6 Months" },
  { value: "long_term", label: "All Time" },
];

const GENRE_COLORS = [
  "var(--ctp-blue)",
  "var(--ctp-purple)",
  "var(--ctp-lavender)",
  "var(--ctp-teal)",
  "var(--ctp-pink)",
  "var(--ctp-peach)",
  "var(--ctp-yellow)",
  "var(--ctp-mint)",
  "var(--ctp-green)",
  "var(--ctp-red-pink)",
];

const TRACK_TIERS = [5, 10, 20] as const;
const ALBUM_MAX_CHARS = 28;

function truncateLabel(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars - 3)}...`;
}

// ---------------------------------------------------------------------------
// Main Dashboard
// ---------------------------------------------------------------------------

interface MusicDashboardProps {
  data: MusicPageData;
}

export function MusicDashboard({ data }: MusicDashboardProps) {
  const [range, setRange] = useState<TimeRange>("short_term");

  const tracks = data.tracks[range];
  const artists = data.artists[range];
  const genres = data.genres[range];

  return (
    <div className="flex flex-col gap-8">
      {/* Time range tabs */}
      <div className="flex items-center gap-1 rounded-lg border border-border/40 bg-card/30 p-1">
        {TIME_RANGES.map((tr) => (
          <button
            key={tr.value}
            onClick={() => setRange(tr.value)}
            className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all ${
              range === tr.value
                ? "bg-(--ctp-blue)/15 text-(--ctp-blue) shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tr.label}
          </button>
        ))}
      </div>

      {/* Top Tracks */}
      <TopTracksSection tracks={tracks} />

      {/* Top Artists */}
      <TopArtistsSection artists={artists} />

      {/* Top Genres */}
      <TopGenresSection genres={genres} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Top Tracks — show 5 → 10 → 20
// ---------------------------------------------------------------------------

function TopTracksSection({ tracks }: { tracks: SerializedTrack[] }) {
  const [tier, setTier] = useState(0);
  const visibleCount = TRACK_TIERS[tier];
  const visible = tracks.slice(0, visibleCount);
  const nextTier = tier < TRACK_TIERS.length - 1 ? TRACK_TIERS[tier + 1] : null;

  return (
    <section>
      <SectionLabel label="Top Tracks" count={tracks.length} />

      <div className="mt-3 divide-y divide-border/30">
        {visible.map((track, i) => (
          <a
            key={track.id}
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-2 py-2.5 transition-colors hover:bg-(--ctp-blue)/4 sm:gap-4 sm:px-3"
          >
            {/* Rank */}
            <span
              className={`w-6 shrink-0 text-right font-mono text-sm font-bold tabular-nums ${
                i < 3 ? "text-(--ctp-blue)" : "text-muted-foreground/40"
              }`}
            >
              {i + 1}
            </span>

            {/* Album art */}
            {track.albumArt ? (
              <div className="relative size-10 shrink-0 overflow-hidden rounded-md shadow-sm">
                <Image
                  src={track.albumArt}
                  alt={track.album}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="40px"
                />
              </div>
            ) : (
              <div className="size-10 shrink-0 rounded-md bg-muted" />
            )}

            {/* Track info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {track.name}
                {track.explicit && (
                  <span className="ml-1.5 inline-block rounded bg-muted px-1 py-px align-text-bottom text-[9px] font-bold uppercase text-muted-foreground">
                    E
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {track.artist}
              </p>
            </div>

            {/* Album (desktop) */}
            <p className="hidden min-w-0 flex-[0_0_30%] truncate text-sm text-muted-foreground/70 md:block">
              {truncateLabel(track.album, ALBUM_MAX_CHARS)}
            </p>

            {/* Duration */}
            <span className="shrink-0 font-mono text-xs text-muted-foreground/50">
              {track.duration}
            </span>
          </a>
        ))}
      </div>

      {/* View more / View less */}
      <div className="mt-3 flex items-center justify-center gap-3">
        {nextTier && tracks.length > visibleCount && (
          <button
            onClick={() => setTier((t) => t + 1)}
            className="text-xs font-medium text-(--ctp-blue) transition-colors hover:text-(--ctp-blue-hover)"
          >
            View more ({nextTier})
          </button>
        )}
        {tier > 0 && (
          <button
            onClick={() => setTier(0)}
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Show less
          </button>
        )}
      </div>

      {tracks.length === 0 && (
        <EmptyState message="No tracks found for this period" />
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Top Artists
// ---------------------------------------------------------------------------

function TopArtistsSection({ artists }: { artists: SerializedArtist[] }) {
  return (
    <section>
      <SectionLabel label="Top Artists" count={artists.length} />

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {artists.slice(0, 10).map((artist) => (
          <a
            key={artist.id}
            href={artist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2.5 rounded-xl border border-transparent p-3 transition-all hover:border-border/40 hover:bg-card/40"
          >
            {/* Artist image */}
            {artist.image ? (
              <div className="relative size-20 overflow-hidden rounded-full ring-2 ring-border/30 transition-all group-hover:ring-(--ctp-blue)/40">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ) : (
              <div className="flex size-20 items-center justify-center rounded-full bg-muted ring-2 ring-border/30">
                <svg
                  className="size-8 text-muted-foreground/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
                </svg>
              </div>
            )}

            {/* Name + top genre */}
            <div className="w-full text-center">
              <p className="truncate text-xs font-semibold text-foreground">
                {artist.name}
              </p>
              {artist.genres[0] && (
                <p className="mt-0.5 truncate text-[10px] text-muted-foreground/60">
                  {artist.genres[0]}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>

      {artists.length === 0 && (
        <EmptyState message="No artists found for this period" />
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Top Genres
// ---------------------------------------------------------------------------

function TopGenresSection({ genres }: { genres: GenreData[] }) {
  const top = genres.slice(0, 12);
  const maxCount = top[0]?.count ?? 1;

  return (
    <section>
      <SectionLabel label="Top Genres" count={genres.length} />

      <div className="mt-3 flex flex-col gap-2">
        {top.map((g, i) => {
          const width = Math.max((g.count / maxCount) * 100, 8);
          const color = GENRE_COLORS[i % GENRE_COLORS.length];
          return (
            <div key={g.genre} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-right text-xs text-muted-foreground sm:w-32">
                {g.genre}
              </span>
              <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-muted/30">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${width}%`,
                    backgroundColor: color,
                    opacity: 0.7,
                  }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-mono text-[10px] text-muted-foreground/50">
                {g.percentage}%
              </span>
            </div>
          );
        })}
      </div>

      {genres.length === 0 && <EmptyState message="No genre data available" />}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

function SectionLabel({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-baseline justify-between">
      <h2 className="text-lg font-bold tracking-tight text-foreground">
        {label}
      </h2>
      <span className="text-xs tabular-nums text-muted-foreground/40">
        {count} total
      </span>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed border-border/30 py-12">
      <p className="text-sm text-muted-foreground/50">{message}</p>
    </div>
  );
}
