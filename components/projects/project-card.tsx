import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Github, ExternalLink } from "lucide-react";
import { type Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:bg-accent/50">
      {/* Project Image */}
      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="truncate text-sm text-muted-foreground">
          {project.shortDescription}
        </p>
      </div>

      {/* Links */}
      <div className="flex shrink-0 items-center gap-3">
        {project.repo && (
          <Link
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label={`${project.title} GitHub repository`}
          >
            <Github className="size-5" />
          </Link>
        )}
        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label={`${project.title} live demo`}
          >
            <ExternalLink className="size-5" />
          </Link>
        )}
        <ChevronRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
    </div>
  );
}
