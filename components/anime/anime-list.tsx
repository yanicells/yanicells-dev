"use client";

import { useState, useMemo } from "react";
import { AnimeCard } from "./anime-card";
import { AnimeSearch } from "./anime-search";
import { AnimeTabs, type FilterTab } from "./anime-tabs";
import { type AnimeEntry } from "@/lib/data/anime";
import { type AnimeApiData } from "@/lib/jikan";

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
      case "recommendations":
        filtered = filtered.filter((e) => e.recommended);
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
      {/* Sticky search + tabs */}
      <div className="sticky top-14 z-40 -mx-6 bg-background px-6 py-4">
        <div className="flex flex-col gap-4">
          <AnimeSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <AnimeTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            filteredCount={filteredEntries.length}
            totalCount={entries.length}
          />
        </div>
      </div>

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
