import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "explore yanicells' projects — from unisort (university matching platform) to multiplayer games, music apps, and more. built with next.js, react, java, and modern web technologies.",
  openGraph: {
    title: "Projects | Yanicells",
    description:
      "explore yanicells' web development and software projects built with next.js, react, java, and more.",
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
