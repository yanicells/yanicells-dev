"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "./project-card";
import { type Project, type ProjectCategory } from "@/lib/data/projects";

const categoryLabels: Record<ProjectCategory, string> = {
  featured: "Featured",
  webdev: "Web Dev",
  java: "Java",
};

interface ProjectsTabsProps {
  projects: Project[];
  activeTab: ProjectCategory;
  onTabChange: (tab: ProjectCategory) => void;
}

export function ProjectsTabs({
  projects,
  activeTab,
  onTabChange,
}: ProjectsTabsProps) {
  const filteredProjects = projects.filter(
    (project) => project.category === activeTab,
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as ProjectCategory)}
      className="w-full"
    >
      <TabsList>
        {(Object.keys(categoryLabels) as ProjectCategory[]).map((cat) => (
          <TabsTrigger key={cat} value={cat}>
            {categoryLabels[cat]}
          </TabsTrigger>
        ))}
      </TabsList>

      {(Object.keys(categoryLabels) as ProjectCategory[]).map((cat) => (
        <TabsContent key={cat} value={cat} className="mt-6">
          <div className="flex flex-col gap-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                No projects found matching your search.
              </p>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
