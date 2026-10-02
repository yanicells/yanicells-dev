import type { Metadata } from "next";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { contact } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Yani Capistrano for work, a project, or a conversation.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Yani Capistrano", url: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" className="index-page contact-page">
        <header className="page-heading">
          <p className="eyebrow">Contact</p>
          <h1>Get in touch.</h1>
          <p>For work, a project, or a conversation.</p>
        </header>
        <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a>
        <div className="contact-profiles">
          <a className="text-link" href={contact.github}>GitHub ↗</a>
          <a className="text-link" href={contact.linkedin}>LinkedIn ↗</a>
          <a className="text-link" href={contact.resume}>Resume ↗</a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
