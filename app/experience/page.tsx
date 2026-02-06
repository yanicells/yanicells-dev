import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "edrian miguel e. capistrano's (yanicells) professional experience and involvement — organizations, roles, and contributions as a cs student and web developer.",
  openGraph: {
    title: "Experience | Yanicells",
    description:
      "yanicells' professional experience, organizations, and roles as a cs student and web developer.",
    url: "https://yanicells.dev/experience",
  },
  alternates: {
    canonical: "https://yanicells.dev/experience",
  },
};

export default function ExperiencePage() {
  return (
    <PageLayout>
      <ExperienceTimeline />
    </PageLayout>
  );
}
