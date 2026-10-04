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
        <div className="experience-list experience-list-full">
          {experiences.map((experience) => (
            <article className="experience-row" key={experience.organization}>
              <div>
                <h2>{experience.organization}</h2>
                <p className="experience-role">{experience.title}</p>
                <p className="experience-description">{experience.description}</p>
                {experience.previousRole && (
                  <p className="experience-description">Previously: {experience.previousRole}.</p>
                )}
              </div>
              <p className="experience-date">{experience.date}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
