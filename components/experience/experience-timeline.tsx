import { experiences, type Experience } from "@/lib/data/experience";

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="group relative pl-6 sm:pl-8">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 size-2.5 rounded-full border-2 border-primary bg-background transition-all group-hover:scale-125 sm:size-3" />

      {/* Timeline line */}
      <div className="absolute bottom-0 left-1 top-5 w-0.5 bg-border group-last:hidden sm:left-[5px]" />

      {/* Card */}
      <div className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-lg sm:p-6">
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
          <div>
            <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
              {experience.title}
            </h3>
            <p className="text-sm font-medium text-primary">
              {experience.organization}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs text-muted-foreground sm:text-sm">
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
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-foreground sm:mb-12 sm:text-4xl lg:text-5xl">
        Experience
      </h1>

      <div className="space-y-4 sm:space-y-6">
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
