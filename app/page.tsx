import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { projects } from "@/lib/data/projects";
import { experiences } from "@/lib/data/experience";
import { contact } from "@/lib/data/contact";

export default function HomePage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content">
        <section className="intro" aria-labelledby="intro-heading">
          <h1 id="intro-heading">Yani Capistrano</h1>
          <p className="intro-role">Software &amp; AI engineering</p>
          <p className="intro-description">
            I build web applications and AI tools. I’m also a Computer Science
            student at Ateneo de Manila University.
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
          <h2 id="work-heading">Selected work</h2>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="project-preview"
                  aria-label={`View ${project.title}`}
                  tabIndex={-1}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 540px) calc(100vw - 48px), 200px"
                    className="project-preview-image"
                  />
                </Link>
                <div className="project-summary">
                  <p className="project-context">{project.context}</p>
                  <h3>
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-outcome">{project.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="home-section"
          aria-labelledby="experience-heading"
        >
          <div className="section-heading">
            <h2 id="experience-heading">Experience</h2>
            <a className="text-link" href={contact.resume}>
              View resume
            </a>
          </div>
          <div className="experience-list">
            {experiences.map((experience) => (
              <article className="experience-row" key={experience.organization}>
                <div>
                  <h3>{experience.organization}</h3>
                  <p className="experience-role">{experience.title}</p>
                  <p className="experience-description">
                    {experience.description}
                  </p>
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
          <h2 id="about-heading">A little about me</h2>
          <div className="about-copy">
            <p>
              I’m Edrian Miguel E. Capistrano, usually Yani. I study Computer
              Science at Ateneo de Manila University, where I’m a Financial Aid
              and DOST scholar.
            </p>
            <p>
              My work has taken me from student organization websites to AI
              engineering internships and software for a local resort. I also
              enjoy photography outside of coding.
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
  );
}
