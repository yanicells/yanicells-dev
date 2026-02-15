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
    <div className="space-y-4">
      {/* Top divider */}
      <div className="h-px bg-border" />

      {/* Stats with justify-between */}
      <div className="flex flex-col gap-3 py-2 md:flex-row md:items-center md:justify-between md:gap-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <stat.icon className="size-4 text-muted-foreground" />
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-foreground">{stat.value}</span>
              <span className="text-sm uppercase tracking-wider text-muted-foreground/60">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="h-px bg-border" />
    </div>
  );
}
