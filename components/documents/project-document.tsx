"use client";

import Image from "next/image";
import { getProjectBySlug, type BlogBlock } from "@/lib/data/projects";
import { TAGS, projectTags } from "@/components/finder/finder-data";
import { DocumentWindow, LinkButton, SectionHeading } from "./document-window";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "text":
      return <p>{block.content}</p>;
    case "image":
      return (
        <figure>
          <Image src={block.src} alt={block.alt} width={1200} height={750} className="h-auto w-full rounded-lg" />
          {block.caption && (
            <figcaption className="mt-1.5 text-[12px] text-secondary-label">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-lg bg-black/40 p-3 font-mono text-[12px]">
          <code>{block.content}</code>
        </pre>
      );
  }
}

/** One project's write-up: screenshot, links, stack, then the story. */
export function ProjectDocument({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  if (!project) return <DocumentWindow title="Untitled">This project could not be found.</DocumentWindow>;

  const tags = projectTags(project).map((id) => TAGS.find((t) => t.id === id)!);

  return (
    <DocumentWindow title={project.title}>
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        width={1200}
        height={750}
        sizes="620px"
        className="h-auto w-full rounded-lg shadow-[0_0_0_0.5px_rgb(255_255_255/0.15),0_4px_16px_rgb(0_0_0/0.4)]"
        priority
      />

      <h1 className="mt-6 text-[26px] leading-tight font-bold text-white">{project.title}</h1>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-secondary-label">
        {project.date && <span>{project.date}</span>}
        {tags.map((tag) => (
          <span key={tag.id} className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: tag.color }} />
            {tag.label}
          </span>
        ))}
      </p>

      <p className="mt-4 text-[15px]">{project.description}</p>

      {(project.live || project.repo || project.demo) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.live && (
            <LinkButton href={project.live} primary>
              Visit site
            </LinkButton>
          )}
          {project.repo && <LinkButton href={project.repo}>Source code</LinkButton>}
          {project.demo && <LinkButton href={project.demo}>Demo video</LinkButton>}
        </div>
      )}

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-white/8 px-2.5 py-0.5 text-[12px] text-secondary-label shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.1)]"
          >
            {tech}
          </li>
        ))}
      </ul>

      {project.blog?.map((section) => (
        <section key={section.title}>
          <SectionHeading>{section.title}</SectionHeading>
          <div className="space-y-3.5">
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </section>
      ))}
    </DocumentWindow>
  );
}
