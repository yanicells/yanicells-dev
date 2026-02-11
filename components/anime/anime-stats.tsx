import {
  animeList,
  getAverageRating,
  getPerfectScoreCount,
} from "@/lib/data/anime";
import { Heart, Star, TrendingUp, Tv } from "lucide-react";

const stats = [
  {
    label: "Total Watched",
    value: animeList.length.toString(),
    icon: Tv,
  },
  {
    label: "Average Rating",
    value: getAverageRating().toFixed(1),
    icon: TrendingUp,
  },
  {
    label: "Perfect 10s",
    value: getPerfectScoreCount().toString(),
    icon: Star,
  },
  {
    label: "Favorites",
    value: animeList
      .filter((a) => a.status?.includes("favorite"))
      .length.toString(),
    icon: Heart,
  },
];

export function AnimeStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
            <stat.icon className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="truncate text-xs text-muted-foreground">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
