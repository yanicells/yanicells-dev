import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Play,
  CalendarDays,
} from "lucide-react";

import { PageLayout } from "@/components/shared/page-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { projects, getProjectBySlug } from "@/lib/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Yanicells`,
      description: project.shortDescription,
      url: `https://yanicells.dev/projects/${project.slug}`,
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 675,
              alt: project.title,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `https://yanicells.dev/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>

        {/* Project Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border-1">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info Container: Consistent Gap-3 for Title, Meta, Desc, Stack */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {/* Date */}
            {project.date && (
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                {project.date}
              </span>
            )}
            |

            {/* Links */}
            <div className="flex items-center gap-3">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <Github className="size-4" />
                  Repo
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <ExternalLink className="size-4" />
                  Live
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <Play className="size-4" />
                  Demo
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mt-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-border font-mono text-sm px-3 py-1"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog sections */}
        {project.blog && project.blog.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-10">
              {project.blog.map((section, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {section.blocks.map((block, j) => {
                      if (block.type === "text") {
                        return (
                          <p
                            key={j}
                            className="text-muted-foreground leading-relaxed"
                          >
                            {block.content}
                          </p>
                        );
                      }
                      if (block.type === "image") {
                        return (
                          <figure key={j} className="flex flex-col gap-2">
                            <div className="relative w-full overflow-hidden rounded-lg bg-muted">
                              <Image
                                src={block.src}
                                alt={block.alt}
                                width={1200}
                                height={675}
                                className="h-auto w-full object-contain"
                              />
                            </div>
                            {block.caption && (
                              <figcaption className="text-center text-xs text-muted-foreground">
                                {block.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      }
                      if (block.type === "code") {
                        return (
                          <div key={j} className="flex flex-col gap-1">
                            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono text-foreground">
                              <code>{block.content}</code>
                            </pre>
                            {block.caption && (
                              <p className="text-xs text-muted-foreground">
                                {block.caption}
                              </p>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Nav: prev / next project */}
        <Separator />
        <div className="flex items-center justify-between gap-4">
          {prevProject ? (
            <Button asChild variant="ghost" className="gap-2 px-0">
              <Link href={`/projects/${prevProject.slug}`}>
                <ArrowLeft className="size-4" />
                <span className="flex flex-col text-left">
                  <span className="text-xs text-muted-foreground">
                    Previous
                  </span>
                  <span className="text-sm font-medium">
                    {prevProject.title}
                  </span>
                </span>
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Button asChild variant="ghost" className="gap-2 px-0 text-right">
              <Link href={`/projects/${nextProject.slug}`}>
                <span className="flex flex-col text-right">
                  <span className="text-xs text-muted-foreground">Next</span>
                  <span className="text-sm font-medium">
                    {nextProject.title}
                  </span>
                </span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
