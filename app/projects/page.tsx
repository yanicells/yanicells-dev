import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Yanicells' projects — from UniSort (university matching platform) to multiplayer games, music apps, and more. Built with Next.js, React, Java, and modern web technologies.",
  openGraph: {
    title: "Projects | Yanicells",
    description:
      "Explore Yanicells' web development and software projects built with Next.js, React, Java, and more.",
    url: "https://yanicells.dev/projects",
  },
  alternates: {
    canonical: "https://yanicells.dev/projects",
  },
};

export default function ProjectsPage() {
  return (
    <PageLayout>
      <ProjectsGrid />
    </PageLayout>
  );
}
