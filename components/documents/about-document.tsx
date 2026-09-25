"use client";

import Image from "next/image";
import { useDesktop } from "@/components/desktop/desktop-context";
import { finderAt } from "@/components/desktop/window-manager";
import { DocumentWindow, PushButton, SectionHeading } from "./document-window";

const SCHOOL: [string, string][] = [
  ["Program", "BS Computer Science, Ateneo de Manila University (expected 2028)"],
  ["QPI", "3.81 cumulative"],
  ["Dean's List", "First Honor in 1st year; Second Honor in 2nd year, 1st sem"],
  ["Scholarships", "DOST-SEI Merit Scholar, Ateneo Financial Aid Scholar"],
  [
    "High school",
    "La Salle Academy, Iligan City (STEM). Senior High valedictorian with highest honors, and the Br. Andrew Gonzales FSC Award for Research",
  ],
];

const STACK: [string, string][] = [
  ["Languages", "TypeScript, JavaScript, Python, Java, SQL, HTML/CSS"],
  ["Frameworks", "Next.js, React, Node.js, Express, Django, Tailwind CSS"],
  ["Data", "PostgreSQL, Neon, Supabase, Convex, Drizzle ORM, Better Auth"],
  ["AI", "LLM APIs (OpenAI, Gemini), agent workflows, prompt engineering"],
  ["Tools", "Git, GitHub, Vercel, Postman"],
];

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-[104px_1fr] gap-x-4 gap-y-2 text-[13px]">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-secondary-label">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** "About Me": who Yani is, school, stack, and where to go next. */
export function AboutDocument() {
  const { open } = useDesktop();

  return (
    <DocumentWindow title="About Me">
      <header className="flex items-center gap-5">
        <Image
          src="/avatar.jpg"
          alt="Yani"
          width={88}
          height={88}
          className="size-[88px] shrink-0 rounded-full object-cover shadow-[0_0_0_0.5px_rgb(255_255_255/0.2)]"
          loading="eager"
        />
        <div>
          <h1 className="text-[26px] leading-tight font-bold text-white">
            Edrian Miguel E. Capistrano
          </h1>
          <p className="text-secondary-label">Yani · yanicells</p>
        </div>
      </header>

      <div className="mt-6 space-y-3.5">
        <p>
          Hey, I&apos;m Yani. I&apos;m a 3rd-year Computer Science student at Ateneo de Manila
          University. I&apos;m from Iligan City and study in Quezon City.
        </p>
        <p>
          I build full-stack web apps and, lately, a lot of AI tools. I like shipping things: most
          of my projects are deployed publicly, used by real people, and improved from there.
        </p>
        <p>
          Right now I&apos;m interning remotely as an AI Engineering Intern at Diffusr and an AI
          Engineering &amp; Product Innovation Intern at JWay Group. On campus I do dev work for
          MISA, CompSAt, and GDG on Campus Loyola, and help run MISA&apos;s tech workshops.
        </p>
        <p>
          Outside of code, I shoot photos and short films on a Canon R50, play badminton with
          friends, watch anime, and keep a journal. Music-wise it&apos;s usually Munimuni, Ed
          Sheeran, or Cup of Joe. I speak English, Filipino, and Bisaya.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <PushButton onClick={() => open(finderAt("projects"))}>See my projects</PushButton>
        <PushButton onClick={() => open({ kind: "experience" })}>Experience</PushButton>
        <PushButton onClick={() => open({ kind: "web", doc: "resume" })}>Resume</PushButton>
        <PushButton onClick={() => open({ kind: "contact" })}>Contact</PushButton>
      </div>

      <SectionHeading>School</SectionHeading>
      <Facts rows={SCHOOL} />

      <SectionHeading>What I work with</SectionHeading>
      <Facts rows={STACK} />
    </DocumentWindow>
  );
}
