"use client";

import { useState } from "react";
import { ProjectList } from "@/components/portfolio/project-list";
import type { ProjectCategory, ProjectPreview } from "@/lib/data/projects";

const filters: ("All" | ProjectCategory)[] = ["All", "AI", "Web", "Games", "Org work"];

export function ProjectGallery({ projects }: { projects: ProjectPreview[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((project) => project.category === filter);

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
