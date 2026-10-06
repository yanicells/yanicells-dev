import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { projects, getProjectBySlug } from "@/lib/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Yani Capistrano`,
      description: project.description,
      url: `/projects/${project.slug}`,
      ...(project.image && {
        images: [{ url: project.image.src, alt: project.image.alt }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Yani Capistrano`,
      description: project.description,
      ...(project.image && { images: [project.image.src] }),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" className="project-page">
        <Link className="back-link" href="/projects">
          Back to projects
        </Link>
        <article>
          <header className="project-page-header">
            <p className="project-context">{project.context}</p>
            <h1>{project.title}</h1>
            <p className="project-page-description">{project.description}</p>
            <p className="project-page-outcome">{project.outcome}</p>
          </header>

          {project.image && (
            <div className="project-page-image">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(max-width: 848px) calc(100vw - 48px), 800px"
                className="project-detail-image"
                priority
              />
            </div>
          )}

          <dl className="project-facts">
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>{project.tech.join(", ")}</dd>
            </div>
            {project.links.length > 0 && (
              <div>
                <dt>Links</dt>
                <dd className="project-links">
                  {project.links.map((link) => (
                    <a className="text-link" href={link.href} key={link.href}>
                      {link.label}
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>

          <div className="project-story">
            {project.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </article>
        <nav className="more-work" aria-label="Other selected projects">
          <h2>More projects</h2>
          {projects
            .filter((other) => other.featured && other.slug !== project.slug)
            .map((other) => (
              <Link href={`/projects/${other.slug}`} key={other.slug}>
                {other.title}
              </Link>
            ))}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
