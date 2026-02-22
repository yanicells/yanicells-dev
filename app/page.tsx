import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { ChatInterface } from "@/components/home/chat-interface";

export const metadata: Metadata = {
  title: "Home | Yanicells",
  description:
    "Hi, I'm Edrian Miguel E. Capistrano (Yanicells) — a Full-Stack Web Developer and Computer Science Student at Ateneo de Manila University. Check out my projects, tech stack, and more.",
  openGraph: {
    title: "Home | Yanicells",
    description:
      "Hi, I'm Edrian Miguel E. Capistrano (Yanicells) — a Full-Stack Web Developer and Computer Science Student at Ateneo de Manila University.",
    url: "https://yanicells.dev",
  },
  alternates: {
    canonical: "https://yanicells.dev",
  },
};

export default function Page() {
  return (
    <PageLayout fullWidth>
      <ChatInterface />
    </PageLayout>
  );
}
