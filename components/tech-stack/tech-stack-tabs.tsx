"use client";

import { type TechCategory, categoryLabels } from "@/lib/data/tech-stack";

export type TabValue = "featured" | TechCategory;

const tabOrder: TabValue[] = [
  "featured",
  "languages",
  "frontend",
  "backend",
  "database",
  "tools",
];

const tabLabels: Record<TabValue, string> = {
  featured: "Featured",
  ...categoryLabels,
};

interface TechStackTabsProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

export function TechStackTabs({ activeTab, onTabChange }: TechStackTabsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {tabOrder.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`border-b-2 px-2 py-2 text-sm font-medium transition-colors ${
            activeTab === tab
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tabLabels[tab]}
        </button>
      ))}
    </div>
  );
}
