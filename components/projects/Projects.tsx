"use client";

import { useEffect, useRef } from "react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Redhead Redemption",
    description:
      "A LAN-based multiplayer top-down shooter with custom networking, enemy AI, leveling systems, and hand-drawn pixel art assets.",
    tech: ["Java", "Sockets", "Multithreading", "OOP"],
    link: "https://github.com/yanicells/Redhead-Redemption",
    image: "/projects/redemption.png",
  },
  {
    title: "MISAyang Samahan",
    description:
      "A Pokémon-themed HR platform for MISA with quiz-based sorting, admin tools, and family assignments used by 60+ members.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "TailwindCSS"],
    link: "https://family.misa.org.ph",
    image: "/projects/misayang.png",
  },
  {
    title: "Chika",
    description:
      "A personalized freedom wall app that allows users to post anonymous messages and interact with others' posts.",
    tech: ["Next.js", "Neon", "PostgreSQL"],
    link: "https://chika.yanicells.dev",
    image: "/projects/chika.png",
  },
  {
    title: "CityCraft",
    description:
      "An interactive 2D animated cityscape with dual-player control, dynamic weather, fireworks, and environmental sound effects.",
    tech: ["Java", "Swing", "AWT", "Multithreading"],
    link: "https://github.com/yanicells/CityCraft",
    image: "/projects/citycraft.png",
  },
  {
    title: "Musicells",
    description:
      "A music discovery app using Spotify's API to browse albums, view new releases, and save favorites.",
    tech: ["React", "Zustand", "Vite", "TailwindCSS", "Spotify API"],
    link: "https://musicells.yanicells.dev",
    image: "/projects/musicells.png",
  },
  {
    title: "NASA APIs Explorer",
    description:
      "A web app that integrates multiple NASA APIs to display astronomy images, media libraries, and Mars rover data.",
    tech: ["Node.js", "Express.js", "TailwindCSS", "REST APIs"],
    link: "https://github.com/yanicells/NASA-APIs",
    image: "/projects/nasa.png",
  },
  {
    title: "Pixcells",
    description:
      "My photography and videography portfolio. Showcasing my work with a clean and responsive design.",
    tech: ["Next.js", "React", "TailwindCSS", "Vite"],
    link: "https://github.com/yanicells/pixcells",
    image: "/projects/pixcells.png",
  },
  {
    title: "Blogcells",
    description:
      "A blogging platform where users can create posts, leave comments, and like content with a clean interface.",
    tech: ["Node.js", "Express.js", "TailwindCSS", "PostgreSQL"],
    link: "https://github.com/yanicells/Blogcells",
    image: "/projects/blogcells.png",
  },
  {
    title: "Travel-Tracker",
    description:
      "Track and visualize countries you've visited using ISO codes, with user profiles and country management features.",
    tech: ["Node.js", "Express.js", "Bootstrap", "PostgreSQL"],
    link: "https://github.com/yanicells/Travel-Tracker",
    image: "/projects/travel.png",
  },
  {
    title: "UniSort",
    description:
      "A personality quiz that sorts users into universities based on their answers, with authentication and result storage.",
    tech: ["Node.js", "Express.js", "TailwindCSS", "PostgreSQL"],
    link: "https://github.com/yanicells/Big-4-Sorter",
    image: "/projects/unisort.png",
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
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#313244] rounded-lg overflow-hidden hover:bg-[#45475a] transition-all duration-300 hover:shadow-xl hover:shadow-[#89b4fa]/10 hover:-translate-y-2 border border-[#45475a] hover:border-[#89b4fa] block group"
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
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-[#1e1e2e] text-[#89b4fa] rounded-full text-xs font-mono border border-[#89b4fa]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
