import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Play, Star } from "lucide-react";
import { type AnimeEntry } from "@/lib/data/anime";
import { type AnimeApiData } from "@/lib/jikan";

interface AnimeCardProps {
  entry: AnimeEntry;
  apiData: AnimeApiData | null;
}

/** Returns a Tailwind text color class based on the rating value */
function getRatingColor(rating: number): string {
  if (rating >= 9.5) return "text-yellow-400";
  if (rating >= 9) return "text-emerald-400";
  if (rating >= 8) return "text-sky-400";
  return "text-muted-foreground";
}

const statusConfig = {
  favorite: {
    label: "Favorite",
    icon: Heart,
    className: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  },
  "recently-watched": {
    label: "Recent",
    icon: Eye,
    className: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  },
  "currently-watching": {
    label: "Watching",
    icon: Play,
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
} as const;

export function AnimeCard({ entry, apiData }: AnimeCardProps) {
  const title = entry.title;
  const posterUrl = apiData?.large_image_url ?? null;
  const genres = apiData?.genres ?? [];
  const episodes = apiData?.episodes;
  const malScore = apiData?.score;
  const type = apiData?.type;
  const studio = apiData?.studio;
  const year = apiData?.year;

  return (
    <div className="group flex gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40">
      {/* Poster */}
      <div className="relative aspect-2/3 w-20 shrink-0 overflow-hidden rounded-md bg-muted sm:w-24">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No Image
          </div>
        )}

        {/* Rating overlay on poster */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1 bg-black/70 py-1">
          <Star className="size-3 fill-current text-yellow-400" />
          <span className={`text-xs font-bold ${getRatingColor(entry.rating)}`}>
            {entry.rating}
          </span>
          {entry.rating2 != null ? (
            <>
              <span className="text-[10px] text-muted-foreground">/</span>
              <span
                className={`text-xs font-bold ${getRatingColor(entry.rating2)}`}
              >
                {entry.rating2}
              </span>
            </>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="space-y-1.5">
          {/* Title */}
          <h3 className="text-sm font-semibold leading-tight text-foreground sm:text-base">
            {title}
          </h3>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
            {type ? <span>{type}</span> : null}
            {episodes ? (
              <>
                <span className="text-border">·</span>
                <span>{episodes} eps</span>
              </>
            ) : null}
            {year ? (
              <>
                <span className="text-border">·</span>
                <span>{year}</span>
              </>
            ) : null}
            {studio ? (
              <>
                <span className="text-border">·</span>
                <span>{studio}</span>
              </>
            ) : null}
          </div>

          {/* MAL score comparison */}
          {malScore ? (
            <p className="text-xs text-muted-foreground">
              MAL:{" "}
              <span className="font-medium text-foreground">
                {malScore.toFixed(2)}
              </span>
            </p>
          ) : null}

          {/* Genres */}
          {genres.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {genres.slice(0, 3).map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="px-1.5 py-0 text-[10px]"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          ) : null}

          {/* Personal note */}
          {entry.note ? (
            <p className="text-xs italic text-muted-foreground">
              &ldquo;{entry.note}&rdquo;
            </p>
          ) : null}
        </div>

        {/* Status badges */}
        {entry.status && entry.status.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {entry.status.map((s) => {
              const config = statusConfig[s];
              return (
                <span
                  key={s}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${config.className}`}
                >
                  <config.icon className="size-2.5" />
                  {config.label}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
