"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  techStack,
  getFeaturedTech,
  type TechCategory,
} from "@/lib/data/tech-stack";
import { Button } from "@/components/ui/button";
import { TechStackHeader } from "./tech-stack-header";
import { TechStackSearch } from "./tech-stack-search";
import { TechStackTabs, type TabValue } from "./tech-stack-tabs";
import { FeaturedTechCard } from "./featured-tech-card";
import { TechSection } from "./tech-section";

const categoryOrder: TechCategory[] = [
  "languages",
  "certificates",
  "frontend",
  "backend",
  "database",
  "tools",
];

const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 2;

const createInitialVisibleCounts = (): Record<TechCategory, number> => ({
  languages: INITIAL_VISIBLE,
  certificates: INITIAL_VISIBLE,
  frontend: INITIAL_VISIBLE,
  backend: INITIAL_VISIBLE,
  database: INITIAL_VISIBLE,
  tools: INITIAL_VISIBLE,
});

export function TechStackGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabValue>("featured");
  const [featuredVisibleCount, setFeaturedVisibleCount] =
    useState(INITIAL_VISIBLE);
  const [visibleCounts, setVisibleCounts] = useState<
    Record<TechCategory, number>
  >(createInitialVisibleCounts);

  useEffect(() => {
    setFeaturedVisibleCount(INITIAL_VISIBLE);
    setVisibleCounts(createInitialVisibleCounts());
  }, [searchQuery]);

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

  const visibleFeaturedTech = featuredTech.slice(0, featuredVisibleCount);
  const hasMoreFeatured = featuredTech.length > visibleFeaturedTech.length;

  return (
    <div className="flex flex-col gap-2 sm:gap-10">
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

        {/* Full width grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {visibleFeaturedTech.map((tech) => (
            <FeaturedTechCard key={tech.name} tech={tech} />
          ))}
        </div>

        {hasMoreFeatured && (
          <div className="mt-3">
            <Button
              variant="outline"
              size="default"
              className="w-full rounded-full"
              onClick={() =>
                setFeaturedVisibleCount((prev) => prev + LOAD_MORE_STEP)
              }
            >
              See more
            </Button>
          </div>
        )}
      </section>

      {/* Category Sections */}
      {categoryOrder.map((cat) => {
        const categoryItems = filteredTech.filter(
          (tech) => tech.category === cat,
        );
        const visibleCount = visibleCounts[cat] ?? INITIAL_VISIBLE;
        const visibleItems = categoryItems.slice(0, visibleCount);
        const hasMore = categoryItems.length > visibleItems.length;

        return (
          <TechSection
            key={cat}
            category={cat}
            items={visibleItems}
            totalCount={categoryItems.length}
            hasMore={hasMore}
            onLoadMore={() =>
              setVisibleCounts((prev) => ({
                ...prev,
                [cat]: (prev[cat] ?? INITIAL_VISIBLE) + LOAD_MORE_STEP,
              }))
            }
          />
        );
      })}
    </div>
  );
}
