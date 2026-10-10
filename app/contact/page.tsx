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

const links = [
  { label: "Email", href: `mailto:${contact.email}`, text: contact.email },
  { label: "GitHub", href: contact.github, text: "github.com/yanicells" },
  { label: "LinkedIn", href: contact.linkedin, text: "linkedin.com/in/yanicells" },
  { label: "Resume", href: contact.resume, text: "resume.yanicells.dev" },
];

export default function ContactPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" className="index-page contact-page">
        <header className="page-heading">
          <p className="eyebrow">Contact</p>
          <h1>Get in touch.</h1>
          <p>For work, collaborations, or a conversation.</p>
        </header>
        <ul className="contact-list">
          {links.map((link) => (
            <li key={link.label}>
              <span className="contact-label">{link.label}</span>
              <a className="contact-link" href={link.href}>
                {link.text}
                <span aria-hidden="true"> ↗︎</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
