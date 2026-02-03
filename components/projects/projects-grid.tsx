import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Redhead Redemption",
    description:
      "A LAN-based multiplayer top-down shooter with custom networking, enemy AI, leveling systems, and hand-drawn pixel art assets.",
    tech: ["Java", "Sockets", "Multithreading"],
    repo: "https://github.com/yanicells/Redhead-Redemption",
    demo: "https://drive.google.com/file/d/1TRlHSFsdRRIZ71WZ5kfUPuQtJw5qbnDf/view",
    image: "/projects/redemption.png",
  },
  {
    title: "UniSort",
    description:
      "A university matching platform featuring a weighted multi-dimensional scoring algorithm, research-backed quizzes, and an anonymous Freedom Wall with real-time analytics.",
    tech: ["Next.js", "Drizzle", "Neon"],
    repo: "https://github.com/yanicells/UniSort",
    demo: "https://unisort.ycells.com",
    image: "/projects/unisort.png",
  },
  {
    title: "MISAyang Samahan",
    description:
      "A Pokémon-themed HR platform for MISA with quiz-based sorting, admin tools, and family assignments used by 60+ members.",
    tech: ["Node.js", "PostgreSQL", "TailwindCSS"],
    demo: "https://family.misa.org.ph",
    image: "/projects/misayang.png",
  },
  {
    title: "Chika",
    description:
      "A personalized freedom wall app that allows users to post anonymous messages and interact with others' posts.",
    tech: ["Next.js", "Neon", "PostgreSQL"],
    repo: "https://github.com/yanicells/chika",
    demo: "https://chika.yanicells.dev",
    image: "/projects/chika.png",
  },
  {
    title: "CityCraft",
    description:
      "An interactive 2D animated cityscape with dual-player control, dynamic weather, fireworks, and environmental sound effects.",
    tech: ["Java", "Swing", "Multithreading"],
    repo: "https://github.com/yanicells/CityCraft",
    image: "/projects/citycraft.png",
  },
  {
    title: "Musicells",
    description:
      "A music discovery app using Spotify's API to browse albums, view new releases, and save favorites.",
    tech: ["React", "Zustand", "Spotify API"],
    repo: "https://github.com/yanicells/musicells",
    demo: "https://musicells.yanicells.dev",
    image: "/projects/musicells.png",
  },
  {
    title: "NASA APIs Explorer",
    description:
      "A web app that integrates multiple NASA APIs to display astronomy images, media libraries, and Mars rover data.",
    tech: ["Node.js", "TailwindCSS", "REST APIs"],
    repo: "https://github.com/yanicells/NASA-APIs",
    demo: "https://drive.google.com/file/d/1n3MuIYU4EHJ0Kgk4n10nx89EVc9-OFR8/view",
    image: "/projects/nasa.png",
  },
  {
    title: "Pixcells",
    description:
      "My photography and videography portfolio. Showcasing my work with a clean and responsive design.",
    tech: ["Next.js", "React", "TailwindCSS"],
    repo: "https://github.com/yanicells/pixcells",
    demo: "https://pixcells.yanicells.dev",
    image: "/projects/pixcells.png",
  },
  {
    title: "Blogcells",
    description:
      "A blogging platform where users can create posts, leave comments, and like content with a clean interface.",
    tech: ["Node.js", "TailwindCSS", "PostgreSQL"],
    repo: "https://github.com/yanicells/Blogcells",
    demo: "https://drive.google.com/file/d/1RS3xFCqgAiJHtbu3laanLfSTznuTugma/view",
    image: "/projects/blogcells.png",
  },
  {
    title: "Travel-Tracker",
    description:
      "Track and visualize countries you've visited using ISO codes, with user profiles and country management features.",
    tech: ["Node.js", "Bootstrap", "PostgreSQL"],
    repo: "https://github.com/yanicells/Travel-Tracker",
    demo: "https://drive.google.com/file/d/1pqytL2KhTOcpOAdIYb-RZQhJROimU8p3/view",
    image: "/projects/travel.png",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-[var(--ctp-blue-hover)]">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-border bg-transparent font-mono text-xs text-muted-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2">
          {project.repo && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-border bg-transparent"
            >
              <Link
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-1 size-4" />
                Repo
              </Link>
            </Button>
          )}
          {project.demo && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-border bg-transparent"
            >
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1 size-4" />
                {project.demo.includes("drive.google.com") ? "Demo" : "Live"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
          Projects
        </h1>
        <p className="text-muted-foreground">
          All the projects I have worked on, from personal to collaborative.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
