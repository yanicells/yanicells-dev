"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { NowPlayingData } from "@/lib/spotify";

const REFRESH_MS = 30_000;

function SpotifyGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-[#1ed760]" fill="currentColor" aria-label="Spotify">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

/** Spotify's little animated bars, shown while something is playing. */
function Equalizer() {
  return (
    <span className="flex h-2.5 items-end gap-[2px]" aria-hidden>
      {[0, 0.25, 0.5].map((delay) => (
        <span
          key={delay}
          className="h-3/5 w-[2.5px] animate-equalizer rounded-full bg-[#1ed760]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

function formatTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/**
 * Desktop widget showing what Yani is playing on Spotify right now, or the
 * last thing he played. Polls the now-playing API and ticks the progress bar
 * locally between polls. Hidden when Spotify has nothing to show.
 */
export function SpotifyWidget() {
  const [track, setTrack] = useState<NowPlayingData | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const load = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
        const data: NowPlayingData = await res.json();
        if (cancelled) return;
        setTrack(data);
        setProgress(data.progressMs ?? 0);
        // Poll again at the next refresh, or right after this song ends.
        const remaining =
          data.isPlaying && data.durationMs && data.progressMs !== undefined
            ? data.durationMs - data.progressMs + 1500
            : REFRESH_MS;
        timer = setTimeout(load, Math.min(REFRESH_MS, remaining));
      } catch {
        if (!cancelled) timer = setTimeout(load, REFRESH_MS);
      }
    };

    load();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!track?.isPlaying || !track.durationMs) return;
    const duration = track.durationMs;
    const interval = setInterval(() => setProgress((p) => Math.min(duration, p + 1000)), 1000);
    return () => clearInterval(interval);
  }, [track]);

  if (!track?.title) return null;

  const duration = track.durationMs ?? 0;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={(event) => event.stopPropagation()}
      className="glass absolute top-[calc(var(--menubar-h)+14px)] left-5 flex w-[316px] gap-3 rounded-[22px] p-3 text-white max-sm:hidden"
    >
      {track.albumArt && (
        // Unoptimized: Spotify serves art from several CDN hosts, and an
        // unlisted host would otherwise crash the whole desktop.
        <Image
          src={track.albumArt}
          alt={track.album ?? ""}
          width={84}
          height={84}
          unoptimized
          className="size-[84px] shrink-0 rounded-[12px] object-cover shadow-[0_2px_10px_rgb(0_0_0/0.4)]"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60">
            {track.isPlaying ? (
              <>
                <Equalizer />
                <span className="text-[#1ed760]">Now Playing</span>
              </>
            ) : (
              "Last Played"
            )}
          </span>
          <SpotifyGlyph />
        </div>
        <p className="mt-1 truncate text-[14px] leading-tight font-semibold">{track.title}</p>
        <p className="truncate text-[12px] text-white/60">{track.artist}</p>

        {track.isPlaying && duration > 0 ? (
          <div className="mt-auto">
            <div className="h-[3px] overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: `${(progress / duration) * 100}%` }} />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-white/50 tabular-nums">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        ) : (
          <p className="mt-auto truncate text-[11px] text-white/40">{track.album}</p>
        )}
      </div>
    </a>
  );
}
