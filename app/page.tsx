import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { ChatInterface } from "@/components/home/chat-interface";

export const metadata: Metadata = {
  title: "Home | Yanicells",
  description:
    "hi, i'm edrian miguel e. capistrano (yanicells) — a full-stack web developer and computer science student at ateneo de manila university. check out my projects, tech stack, and more.",
  alternates: {
    canonical: "https://yanicells.dev",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Edrian Miguel E. Capistrano",
  alternateName: "yanicells",
  url: "https://yanicells.dev",
  image: "https://yanicells.dev/yani.png",
  jobTitle: "Full-Stack Web Developer",
  description:
    "Full-stack web developer and computer science student at Ateneo de Manila University.",
  sameAs: [
    "https://github.com/yanicells",
    "https://www.linkedin.com/in/yanicells",
    "https://www.instagram.com/yahneyy",
    "https://www.facebook.com/edrian.capistrano.9",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Ateneo de Manila University",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "TailwindCSS",
    "Node.js",
    "PostgreSQL",
    "Java",
    "Python",
    "Web Development",
  ],
};

export default function Page() {
  return (
    <PageLayout fullWidth>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ChatInterface />
    </PageLayout>
  );
}
