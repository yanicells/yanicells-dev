import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { TechStackGrid } from "@/components/tech-stack/tech-stack-grid";

export const metadata: Metadata = {
  title: "Tech Stack",
  description:
    "technologies and tools yanicells uses — next.js, react, tailwindcss, typescript, postgresql, java, python, and more. explore the full stack of a cs student and web developer.",
  openGraph: {
    title: "Tech Stack | Yanicells",
    description:
      "technologies and tools yanicells uses to build web applications and software projects.",
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
