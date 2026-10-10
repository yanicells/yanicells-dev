import Image from "next/image";
import Link from "next/link";
import type { ProjectPreview } from "@/lib/data/projects";

export function ProjectList({
  projects,
  featured = false,
}: {
  projects: ProjectPreview[];
  featured?: boolean;
}) {
  return (
    <div className={`project-grid${featured ? " project-grid-featured" : ""}`}>
      {projects.map((project) => (
        <article className={`project-card${project.image ? "" : " project-card-text"}`} key={project.href}>
          {project.image && (
            <Link
              href={project.href}
              className="project-preview"
              aria-label={`View ${project.title}`}
              tabIndex={-1}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                loading={featured ? "eager" : "lazy"}
                sizes="(max-width: 540px) 160px, (max-width: 680px) 280px, 250px"
                className="project-preview-image"
              />
            </Link>
          )}
          <div className="project-summary">
            {!featured && <p className="project-context">{project.category}</p>}
            <h3>
              <Link href={project.href}>
                {project.title}
                <span aria-hidden="true"> ↗︎</span>
              </Link>
            </h3>
            <p className="project-description">{project.description}</p>
            {project.outcome && <p className="project-outcome">{project.outcome}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
