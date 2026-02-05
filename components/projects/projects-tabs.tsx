"use client";

import { type ProjectCategory } from "@/lib/data/projects";

export type TabValue = "featured" | "all" | ProjectCategory;

const tabLabels: Record<TabValue, string> = {
  featured: "Featured",
  all: "All",
  webdev: "Web Dev",
  java: "Java",
};

const tabOrder: TabValue[] = ["featured", "all", "webdev", "java"];

interface ProjectsTabsProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

export function ProjectsTabs({ activeTab, onTabChange }: ProjectsTabsProps) {
  return (
    <div className="flex items-center gap-2">
      {tabOrder.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTab === tab
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tabLabels[tab]}
        </button>
      ))}
    </div>
  );
}
