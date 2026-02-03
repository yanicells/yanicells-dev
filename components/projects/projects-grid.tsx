import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/lib/data/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-[var(--ctp-blue-hover)]">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-border bg-transparent font-mono text-xs text-muted-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {project.repo && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-border bg-transparent"
            >
              <Link
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-1 size-4" />
                Repo
              </Link>
            </Button>
          )}
          {project.demo && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-border bg-transparent"
            >
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1 size-4" />
                {project.demo.includes("drive.google.com") ? "Demo" : "Live"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8 text-center sm:mb-12">
        <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Projects
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          All the projects I have worked on, from personal to collaborative.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
