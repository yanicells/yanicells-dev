"use client";

import { useState, useCallback, useMemo } from "react";
import {
  techStack,
  getFeaturedTech,
  type TechCategory,
} from "@/lib/data/tech-stack";
import { TechStackHeader } from "./tech-stack-header";
import { TechStackSearch } from "./tech-stack-search";
import { TechStackTabs, type TabValue } from "./tech-stack-tabs";
import { FeaturedTechCard } from "./featured-tech-card";
import { TechSection } from "./tech-section";

const categoryOrder: TechCategory[] = [
  "languages",
  "frontend",
  "backend",
  "database",
  "tools",
];

export function TechStackGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabValue>("featured");

  const handleTabChange = useCallback((tab: TabValue) => {
    setActiveTab(tab);
    // Scroll to section
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const filteredTech = useMemo(() => {
    if (searchQuery === "") return techStack;
    return techStack.filter(
      (tech) =>
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const featuredTech = getFeaturedTech().filter((tech) =>
    searchQuery === ""
      ? true
      : tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.phrase.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <TechStackHeader />

      {/* Sticky search + tabs */}
      <div className="sticky top-0 z-10 -mx-6 bg-background px-6 py-4">
        <div className="flex flex-col gap-4">
          <TechStackSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <TechStackTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>

      {/* Featured Section */}
      <section id="featured" className="scroll-mt-32">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Featured</h2>
          <p className="text-sm text-muted-foreground">
            My go-to technologies for building applications
          </p>
        </div>

        {/* Centered grid */}
        <div className="mx-auto max-w-2xl">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {featuredTech.map((tech) => (
              <FeaturedTechCard key={tech.name} tech={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {categoryOrder.map((cat) => {
        const categoryItems = filteredTech.filter(
          (tech) => tech.category === cat,
        );
        return <TechSection key={cat} category={cat} items={categoryItems} />;
      })}
    </div>
  );
}
