"use client";

import { useEffect, useRef } from "react";

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

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            contentRef.current.classList.remove(
              "animate-slide-up",
              "opacity-0",
            );
            // Trigger reflow to restart animation
            void contentRef.current.offsetWidth;
            contentRef.current.classList.add("animate-slide-up");
          } else if (contentRef.current) {
            contentRef.current.classList.remove("animate-slide-up");
            contentRef.current.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.1 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-16 pb-48"
    >
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto w-full opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#cdd6f4] mb-4 font-sans">
            Projects
          </h2>
          <p className="text-[#bac2de] font-sans text-sm">
            All the projects I have worked on, from personal to collaborative.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#313244] rounded-lg overflow-hidden hover:bg-[#45475a] transition-all duration-300 hover:shadow-xl hover:shadow-[#89b4fa]/10 hover:-translate-y-2 border border-[#45475a] hover:border-[#89b4fa] group"
            >
              {/* Project Image */}
              <div className="w-full h-48 bg-[#1e1e2e] flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e2e] to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-[#89b4fa] text-4xl font-bold">${project.title.charAt(
                        0,
                      )}</div>`;
                    }
                  }}
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#cdd6f4] mb-3 font-sans">
                  {project.title}
                </h3>
                <p className="text-[#bac2de] mb-4 font-sans text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-[#1e1e2e] text-[#89b4fa] rounded-full text-xs font-mono border border-[#89b4fa]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#1e1e2e] text-[#cdd6f4] rounded-md hover:bg-[#89b4fa] hover:text-[#1e1e2e] transition-all duration-300 text-sm font-sans border border-[#45475a] hover:border-[#89b4fa]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Repo
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#1e1e2e] text-[#cdd6f4] rounded-md hover:bg-[#89b4fa] hover:text-[#1e1e2e] transition-all duration-300 text-sm font-sans border border-[#45475a] hover:border-[#89b4fa]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      {project.demo.includes("drive.google.com")
                        ? "Demo"
                        : "Live"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
