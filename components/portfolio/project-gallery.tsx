"use client";

import { useState } from "react";
import { ProjectList } from "@/components/portfolio/project-list";
import type { ProjectCategory, ProjectPreview } from "@/lib/data/projects";

type ProjectFilter = "Featured" | "All" | ProjectCategory;

const filters: ProjectFilter[] = ["Featured", "All", "AI", "Web", "Games", "Org work"];

export function ProjectGallery({ projects }: { projects: ProjectPreview[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("Featured");
  const visible = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Featured") return project.featured;
    return project.category === filter;
  });

  return (
    <>
      <div className="project-filters" role="group" aria-label="Filter projects">
        {filters.map((category) => (
          <button
            type="button"
            key={category}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="project-count" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <ProjectList projects={visible} />
    </>
  );
}
