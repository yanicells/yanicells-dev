"use client";

import { useState, useMemo } from "react";
import { projects } from "@/lib/data/projects";
import { ProjectsHeader } from "./projects-header";
import { ProjectsCarousel } from "./projects-carousel";
import { ProjectsTabs, type TabValue } from "./projects-tabs";
import { ProjectCard } from "./project-card";

export function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabValue>("featured");

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

      <ProjectsCarousel />

      {/* Sticky tabs — matches tech-stack/anime pattern */}
      <div className="sticky top-14 z-40 -mx-6 bg-background px-6 py-4">
        <ProjectsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 3-column grid for larger cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
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
