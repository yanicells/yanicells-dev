import type { Metadata } from "next";
import { PageLayout } from "@/components/shared/page-layout";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Edrian Miguel E. Capistrano (Yanicells) — reach out via email, LinkedIn, GitHub, or social media for collaborations, inquiries, or just to say hi.",
  openGraph: {
    title: "Contact | Yanicells",
    description:
      "Get in touch with Yanicells — reach out via email, LinkedIn, GitHub, or social media.",
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
