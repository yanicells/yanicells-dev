interface Experience {
  title: string;
  organization: string;
  date: string;
  description: string;
}

const experiences: Experience[] = [
  {
    title: "Freelance Full-Stack Developer",
    organization: "Timoga Holiday Resort Iligan City",
    date: "December 2025 - Present",
    description:
      "Developing a full-stack POS and management system handling entrance tracking, multi-cottage reservations, and payroll automation. Created a promotional website with online booking, interactive gallery, and AI-powered customer support using Next.js and Drizzle ORM.",
  },
  {
    title: "IT Skills & Development Officer",
    organization: "Ateneo Management Information Systems Association",
    date: "August 2025 - Present",
    description:
      "Organize technical skill trainings and workshops for students interested in information systems and technology. Assist in developing and maintaining organizational websites and systems to support association activities.",
  },
  {
    title: "Developer",
    organization: "Computer Society of the Ateneo",
    date: "October 2025 - Present",
    description:
      "Developed and deployed software solutions for organizational events and client projects including websites and web applications. Ensured software implementations met professional standards and served project requirements effectively.",
  },
  {
    title: "Backend Developer",
    organization: "Google Developer Groups on Campus Loyola",
    date: "September 2025 - Present",
    description:
      "Designed and maintained server-side applications, databases, and APIs ensuring secure and scalable data handling. Collaborated with front-end developers to integrate user-facing features with back-end logic. Monitored and optimized system performance to maintain reliability and speed.",
  },
  {
    title: "Geekshop Documentation Core Team",
    organization: "Computer Society of the Ateneo",
    date: "July 2025 - Present",
    description:
      "Managed photo and video documentation for events and tracked organizational records. Contributed to event coverage and visual storytelling for Ateneo's computer science community.",
  },
  {
    title: "Writing Assistant",
    organization: "ARISE - SOSE Newsletter",
    date: "2025 - Present",
    description:
      "Contributed to interviewing, article writing, and editing for the School of Science and Engineering newsletter. Collaborated with editorial team to produce engaging content for Ateneo's SOSE community.",
  },
  {
    title: "STEM Strand Vice Governor",
    organization: "Supreme Student Government",
    date: "2023 - 2024",
    description:
      "Assisted events such as Sportsfest, La Salle Fair, and Jumpstart at La Salle Academy. Developed leadership, logistics, time management, and project coordination skills through event management.",
  },
];

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="group relative pl-8">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 size-3 rounded-full border-2 border-[var(--ctp-blue)] bg-background" />

      {/* Timeline line */}
      <div className="absolute bottom-0 left-[5px] top-5 w-0.5 bg-border group-last:hidden" />

      {/* Card */}
      <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-[var(--ctp-blue-hover)]">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {experience.title}
            </h3>
            <p className="text-sm font-medium text-primary">
              {experience.organization}
            </p>
          </div>
          <span className="shrink-0 font-mono text-sm text-[var(--ctp-teal)]">
            {experience.date}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {experience.description}
        </p>
      </div>
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="mb-12 text-center text-4xl font-bold text-foreground sm:text-5xl">
        Experience
      </h1>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <ExperienceCard
            key={`${exp.title}-${exp.organization}`}
            experience={exp}
          />
        ))}
      </div>
    </section>
  );
}
