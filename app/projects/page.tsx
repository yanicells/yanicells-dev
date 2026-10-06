import type { Metadata } from "next";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { projectPreviews } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Web applications, AI tools, games, and projects built with friends and teams.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects | Yani Capistrano", url: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" className="index-page">
        <header className="page-heading">
          <p className="eyebrow">Projects</p>
          <h1>Things I’ve built.</h1>
          <p>Personal projects, team experiments, and software people use.</p>
        </header>
        <ProjectGallery projects={projectPreviews} />
      </main>
      <SiteFooter />
    </div>
  );
}
