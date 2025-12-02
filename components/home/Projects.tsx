"use client";

import Link from "next/link";
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
    tech: ["Java", "Sockets", "Multithreading", "OOP"],
    repo: "https://github.com/yanicells/Redhead-Redemption",
    demo: "https://drive.google.com/file/d/1TRlHSFsdRRIZ71WZ5kfUPuQtJw5qbnDf/view",
    image: "/projects/redemption.png",
  },
  {
    title: "MISAyang Samahan",
    description:
      "A Pokémon-themed HR platform for MISA with quiz-based sorting, admin tools, and family assignments used by 60+ members.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "TailwindCSS"],
    repo: "https://github.com/yanicells/MISAyang-Samahan",
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
              "opacity-0"
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
      { threshold: 0.1 }
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
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12"
    >
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto w-full opacity-0 translate-y-8 transition-all duration-700"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-8 font-sans text-center">
          Featured Projects
        </h2>
        <Link href="/projects" className="block mb-12 group">
          <div className="flex items-center justify-center gap-2 text-[#89b4fa] hover:text-[#b4befe] transition-all duration-300">
            <span className="font-sans text-sm font-medium">
              View all my projects
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#313244] rounded-lg overflow-hidden hover:bg-[#45475a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-[#45475a] hover:border-[#89b4fa] group"
            >
              {/* Project Image */}
              <div className="w-full h-48 bg-[#1e1e2e] flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-[#89b4fa] text-4xl font-bold">${project.title.charAt(
                        0
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
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#1e1e2e] text-[#cdd6f4] rounded-md hover:bg-[#89b4fa] hover:text-[#1e1e2e] transition-all duration-300 text-sm font-sans border border-[#45475a] hover:border-[#89b4fa]"
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
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded-md hover:bg-[#b4befe] transition-all duration-300 text-sm font-sans font-medium"
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
