import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

import { PageLayout } from "@/components/shared/page-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, getProjectBySlug } from "@/lib/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageLayout>
      <div className="flex flex-col gap-6">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>

        {/* Project Image */}
        <div className="relative w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className="h-auto w-full object-contain"
            priority
          />
        </div>

        {/* Title and Description */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-foreground">
            {project.title}
          </h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-border font-mono text-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.repo && (
            <Button asChild variant="outline">
              <Link
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 size-4" />
                View Repository
              </Link>
            </Button>
          )}
          {project.demo && (
            <Button asChild>
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 size-4" />
                {project.demo.includes("drive.google.com")
                  ? "Watch Demo"
                  : "Live Site"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
