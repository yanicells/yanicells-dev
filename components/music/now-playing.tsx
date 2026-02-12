"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import type { NowPlayingData } from "@/lib/spotify";

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify/now-playing");
      const json: NowPlayingData = await res.json();
      setData(json);
    } catch {
      setData(null);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  // Nothing playing
  if (!data?.isPlaying || !data.title) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-border/40 bg-card/30 p-4 backdrop-blur-sm">
        <div className="flex size-12 items-center justify-center rounded-lg bg-muted/50">
          <svg
            className="size-5 text-muted-foreground/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Not Playing
          </p>
          <p className="text-xs text-muted-foreground/50">
            Spotify is quiet right now
          </p>
        </div>
      </div>
    );
  }

  const progress =
    data.durationMs && data.progressMs
      ? (data.progressMs / data.durationMs) * 100
      : 0;

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-(--ctp-blue)/20 bg-card/30 p-4 transition-all hover:border-(--ctp-blue)/40 hover:bg-card/40"
    >
      {/* Equalizer */}
      <div className="absolute right-4 top-3 flex items-end gap-0.75">
        <span
          className="equalizer-bar inline-block w-0.75 rounded-full bg-(--ctp-blue)"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="equalizer-bar inline-block w-0.75 rounded-full bg-(--ctp-blue)"
          style={{ animationDelay: "0.2s" }}
        />
        <span
          className="equalizer-bar inline-block w-0.75 rounded-full bg-(--ctp-blue)"
          style={{ animationDelay: "0.4s" }}
        />
      </div>

      {/* Album art */}
      {data.albumArt && (
        <div className="relative shrink-0">
          <div className="relative size-14 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={data.albumArt}
              alt={data.album ?? ""}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--ctp-blue)">
          Now Playing
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
          {data.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {data.artist} &middot; {data.album}
        </p>

        {/* Progress bar */}
        <div className="mt-2.5 h-0.5 w-full overflow-hidden rounded-full bg-muted/50">
          <div
            className="h-full rounded-full bg-(--ctp-blue)/70 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </a>
  );
}
