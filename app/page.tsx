import Link from "next/link";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { MineralBackdrop } from "@/components/portfolio/mineral-backdrop";
import { ProjectList } from "@/components/portfolio/project-list";
import { homepageProjectPreviews } from "@/lib/data/projects";
import { homepageExperiences } from "@/lib/data/experience";
import { contact } from "@/lib/data/contact";

export default function HomePage() {
  return (
    <div className="home-page">
      <MineralBackdrop />
      <div className="site-shell">
        <SiteHeader opening />
        <main id="main-content">
          <section className="intro" aria-labelledby="intro-heading">
            <h1 id="intro-heading">Yani Capistrano</h1>
            <p className="intro-role">Software &amp; AI engineering</p>
            <p className="intro-description">
              I build web and desktop applications, with a focus on AI tools
              and practical workflows. I study Computer Science at Ateneo de
              Manila University.
            </p>
            <div className="intro-links">
              <a href={contact.github}>GitHub</a>
              <a href={contact.linkedin}>LinkedIn</a>
              <a href={contact.resume}>Resume</a>
            </div>
          </section>

          <section
            id="work"
            className="home-section"
            aria-labelledby="work-heading"
          >
            <div className="section-heading">
              <h2 id="work-heading">Selected projects</h2>
              <Link className="text-link" href="/projects">
                More projects ↗︎
              </Link>
            </div>
            <ProjectList projects={homepageProjectPreviews} featured />
          </section>

          <section
            id="experience"
            className="home-section"
            aria-labelledby="experience-heading"
          >
            <div className="section-heading">
              <h2 id="experience-heading">Experience</h2>
              <Link className="text-link" href="/experience">
                Full experience ↗︎
              </Link>
            </div>
            <div className="experience-list">
              {homepageExperiences.map((experience) => (
                <article
                  className="experience-row"
                  key={experience.organization}
                >
                  <div>
                    <h3>{experience.organization}</h3>
                    <p className="experience-role">{experience.title}</p>
                    <p className="experience-description">{experience.summary}</p>
                  </div>
                  <p className="experience-date">{experience.date}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="about"
            className="home-section about"
            aria-labelledby="about-heading"
          >
            <div className="section-heading">
              <h2 id="about-heading">A little about me</h2>
              <Link className="text-link" href="/about">
                More about me ↗︎
              </Link>
            </div>
            <div className="about-copy">
              <p>
                I’m Edrian Miguel E. Capistrano, usually Yani. I study Computer
                Science at Ateneo de Manila University, specializing in Data
                Science and Analytics. I’m a Financial Aid and DOST scholar.
              </p>
              <p>
                My work has taken me from student organization websites to AI
                engineering internships and freelance product development.
                Outside of coding, I enjoy photography, music, and anime.
              </p>
            </div>
          </section>

          <section
            id="contact"
            className="home-section contact"
            aria-labelledby="contact-heading"
          >
            <h2 id="contact-heading">Get in touch</h2>
            <p>For work, a project, or a conversation.</p>
            <a className="contact-email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </section>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
