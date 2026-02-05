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
    <div className="flex flex-col gap-8">
      <ProjectsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ProjectsCarousel />

      <div className="flex flex-col gap-4">
        <ProjectsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 2-column grid */}
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
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
    </div>
  );
}
