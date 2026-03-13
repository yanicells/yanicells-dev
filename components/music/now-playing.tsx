"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import type { NowPlayingData } from "@/lib/spotify";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify/now-playing");
      const json: NowPlayingData = await res.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  const containerClasses =
    "relative flex items-center gap-4 overflow-hidden rounded-xl border p-2 transition-all min-h-[98px]";

  // Initial Loading
  if (isLoading) {
    return (
      <div
        className={cn(
          containerClasses,
          "border-border/40 bg-card/30 backdrop-blur-sm",
        )}
      >
        <Skeleton className="size-20 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="mt-2 h-1 w-full" />
        </div>
      </div>
    );
  }

  // Nothing available
  if (!data?.title) {
    return (
      <div
        className={cn(
          containerClasses,
          "border-border/40 bg-card/30 backdrop-blur-sm",
        )}
      >
        <div className="flex size-20 items-center justify-center rounded-lg bg-muted/50">
          <svg
            className="size-8 text-muted-foreground/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
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

  const isNowPlaying = data.isPlaying;

  const progress =
    data.durationMs && data.progressMs
      ? (data.progressMs / data.durationMs) * 100
      : 0;

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        containerClasses,
        "group border-(--ctp-blue)/20 bg-card/30 hover:border-(--ctp-blue)/40 hover:bg-card/40",
      )}
    >
      {/* Equalizer */}
      {isNowPlaying && (
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
      )}

      {/* Album art */}
      {data.albumArt && (
        <div className="relative shrink-0">
          <div className="relative size-20 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={data.albumArt}
              alt={data.album ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="80px"
            />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--ctp-blue)">
          {isNowPlaying ? "Now Playing" : "Recently Played"}
        </p>
        <p className="mt-0.5 truncate text-base font-semibold text-foreground">
          {data.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {data.artist} &middot; {data.album}
        </p>

        {/* Progress bar */}
        {isNowPlaying && (
          <div className="mt-2.5 h-0.5 w-full overflow-hidden rounded-full bg-muted/50">
            <div
              className="h-full rounded-full bg-(--ctp-blue)/70 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </a>
  );
}
