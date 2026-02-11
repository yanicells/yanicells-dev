"use client";

import { useState, useMemo } from "react";
import { AnimeCard } from "./anime-card";
import { type AnimeEntry } from "@/lib/data/anime";
import { type AnimeApiData } from "@/lib/jikan";

type FilterTab = "all" | "favorites" | "top-rated" | "recent";

const tabs: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "favorites", label: "Favorites" },
  { value: "top-rated", label: "Top Rated" },
  { value: "recent", label: "Recently Watched" },
];

interface AnimeListProps {
  entries: AnimeEntry[];
  apiDataMap: Record<number, AnimeApiData>;
}

export function AnimeList({ entries, apiDataMap }: AnimeListProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = useMemo(() => {
    let filtered = entries;

    // Tab filtering
    switch (activeTab) {
      case "favorites":
        filtered = filtered.filter((e) => e.status?.includes("favorite"));
        break;
      case "top-rated":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "recent":
        filtered = filtered.filter((e) =>
          e.status?.includes("recently-watched"),
        );
        break;
      default:
        // "all" — sort by watch date (newest first)
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.watchedDate).getTime() -
            new Date(a.watchedDate).getTime(),
        );
        break;
    }

    // Search filtering
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((entry) => {
        const api = apiDataMap[entry.malId];
        const genres = api?.genres?.map((g) => g.toLowerCase()) ?? [];
        return (
          entry.title.toLowerCase().includes(q) ||
          genres.some((g) => g.includes(q))
        );
      });
    }

    return filtered;
  }, [entries, activeTab, searchQuery, apiDataMap]);

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs + Search */}
      <div className="sticky top-0 z-10 -mx-6 bg-background px-6 py-3">
        <div className="flex flex-col gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-64"
          />

          {/* Tabs */}
          <div className="-mx-6 flex gap-1 overflow-x-auto px-6 scrollbar-none sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        Showing {filteredEntries.length} of {entries.length} anime
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filteredEntries.map((entry) => (
          <AnimeCard
            key={entry.malId}
            entry={entry}
            apiData={apiDataMap[entry.malId] ?? null}
          />
        ))}
      </div>

      {filteredEntries.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No anime found matching your search.
        </p>
      ) : null}
    </div>
  );
}
