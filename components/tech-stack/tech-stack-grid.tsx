import Image from "next/image";

interface TechItem {
  name: string;
  icon: string;
}

const technologies: TechItem[] = [
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "HTML/CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Vite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "TailwindCSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
];

function TechCard({ tech }: { tech: TechItem }) {
  return (
    <div className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary hover:shadow-lg sm:gap-3 sm:p-6">
      <div className="relative size-10 transition-transform group-hover:scale-110 sm:size-16">
        <Image
          src={tech.icon}
          alt={tech.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:text-sm">
        {tech.name}
      </span>
    </div>
  );
}

export function TechStackGrid() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-foreground sm:mb-12 sm:text-4xl lg:text-5xl">
        Tech Stack
      </h1>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6">
        {technologies.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </section>
  );
}
