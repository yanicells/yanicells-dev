"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { projects } from "@/lib/data/projects";
import { ProjectsHeader } from "./projects-header";
import { ProjectsCarousel } from "./projects-carousel";
import { ProjectsTabs, type TabValue } from "./projects-tabs";
import { ProjectCard } from "./project-card";

const validTabs = new Set<TabValue>(["featured", "all", "webdev", "java"]);

function isTabValue(tab: string | null): tab is TabValue {
  return tab !== null && validTabs.has(tab as TabValue);
}

export function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const activeTab = isTabValue(tabParam) ? tabParam : "featured";

  const handleTabChange = (tab: TabValue) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (tab === "featured") {
      nextParams.delete("tab");
    } else {
      nextParams.set("tab", tab);
    }

    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filtering
      let matchesCategory = false;
      if (activeTab === "all") {
        matchesCategory = true;
      } else if (activeTab === "featured") {
        matchesCategory = project.isFeatured;
      } else {
        matchesCategory = project.category === activeTab;
      }

      // Search filtering
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <ProjectsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ProjectsCarousel activeTab={activeTab} />

      {/* Sticky tabs — matches tech-stack/anime pattern */}
      <div className="sticky top-14 z-40 -mx-6 bg-background px-6 py-4">
        <ProjectsTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* 3-column grid for larger cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            activeTab={activeTab}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="py-8 text-center text-muted-foreground">
          No projects found matching your search.
        </p>
      )}
    </div>
  );
}
