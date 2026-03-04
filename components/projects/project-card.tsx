import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
}

/**
 * Project card — larger layout inspired by Claude artifacts.
 * Shows a tall image preview with title and description below.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-muted/30 transition-colors hover:bg-muted/60"
    >
      {/* Image */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1 p-4">
        <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.shortDescription}
        </p>
      </div>
    </Link>
  );
}
