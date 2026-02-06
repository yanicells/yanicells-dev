import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "get in touch with edrian miguel e. capistrano (yanicells) — reach out via email, linkedin, github, or social media for collaborations, inquiries, or just to say hi.",
  openGraph: {
    title: "Contact | Yanicells",
    description:
      "get in touch with yanicells — reach out via email, linkedin, github, or social media.",
    url: "https://yanicells.dev/contact",
  },
  alternates: {
    canonical: "https://yanicells.dev/contact",
  },
};

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactInfo />
    </PageLayout>
  );
}
