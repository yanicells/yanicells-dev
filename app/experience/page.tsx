import type { Metadata } from "next";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { experiences } from "@/lib/data/experience";
import { contact } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "Experience",
  description: "AI engineering internships and full-stack development work by Yani Capistrano.",
  alternates: { canonical: "/experience" },
  openGraph: { title: "Experience | Yani Capistrano", url: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" className="index-page">
        <header className="page-heading">
          <p className="eyebrow">Experience</p>
          <h1>Work with teams.</h1>
          <p>Software and AI engineering, freelance work, and developer leadership.</p>
          <a className="text-link" href={contact.resume}>View resume ↗</a>
        </header>
        <ol className="experience-timeline">
          {experiences.map((experience) => (
            <li className="experience-entry" key={experience.organization}>
              <p className="experience-entry-date">{experience.date}</p>
              <div>
                <h2>{experience.organization}</h2>
                <p className="experience-entry-role">{experience.title}</p>
                <p className="experience-entry-description">{experience.description}</p>
                {experience.previousRole && (
                  <p className="experience-entry-previous">Previously {experience.previousRole}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </div>
  );
}
