import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
    >
      {/* Project Image - larger */}
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.shortDescription}
        </p>
      </div>

      {/* Chevron */}
      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
    </Link>
  );
}
