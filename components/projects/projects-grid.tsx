"use client";

import { useState, useMemo } from "react";
import { projects, type ProjectCategory } from "@/lib/data/projects";
import { ProjectsHeader } from "./projects-header";
import { ProjectsCarousel } from "./projects-carousel";
import { ProjectsTabs } from "./projects-tabs";

export function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ProjectCategory>("featured");

  const filteredProjects = useMemo(() => {
    if (searchQuery === "") return projects;
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [searchQuery]);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-8">
      <ProjectsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ProjectsCarousel />

      <ProjectsTabs
        projects={filteredProjects}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </section>
  );
}
