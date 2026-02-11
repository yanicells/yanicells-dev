"use client";

type FilterTab = "all" | "favorites" | "top-rated" | "recent";

const tabs: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "favorites", label: "Favorites" },
  { value: "top-rated", label: "Top Rated" },
  { value: "recent", label: "Recently Watched" },
];

interface AnimeTabsProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  filteredCount?: number;
  totalCount?: number;
}

export function AnimeTabs({
  activeTab,
  onTabChange,
  filteredCount,
  totalCount,
}: AnimeTabsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div
        className="overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex items-center gap-4 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              className={`shrink-0 border-b-2 px-2 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredCount != null && totalCount != null ? (
        <p className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">
          Showing {filteredCount} of {totalCount} anime
        </p>
      ) : null}
    </div>
  );
}

export type { FilterTab };
