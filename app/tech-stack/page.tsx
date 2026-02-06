import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { TechStackGrid } from "@/components/tech-stack/tech-stack-grid";

export const metadata: Metadata = {
  title: "Tech Stack",
  description:
    "Technologies and tools Yanicells uses — Next.js, React, TailwindCSS, TypeScript, PostgreSQL, Java, Python, and more. Explore the full stack of a CS student and web developer.",
  openGraph: {
    title: "Tech Stack | Yanicells",
    description:
      "Technologies and tools Yanicells uses to build web applications and software projects.",
    url: "https://yanicells.dev/tech-stack",
  },
  alternates: {
    canonical: "https://yanicells.dev/tech-stack",
  },
};

export default function TechStackPage() {
  return (
    <PageLayout>
      <TechStackGrid />
    </PageLayout>
  );
}
