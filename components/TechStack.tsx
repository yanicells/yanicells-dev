"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const technologies = [
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "HTML/CSS",
  "SQL",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "Vite",
  "TailwindCSS",
  "Bootstrap",
  "REST APIs",
  "Git",
  "Vercel",
];

// Helper function to map technology names to devicon names
function getIconName(tech: string): string {
  const iconMap: { [key: string]: string } = {
    Java: "java",
    Python: "python",
    JavaScript: "javascript",
    TypeScript: "typescript",
    "HTML/CSS": "html5",
    SQL: "postgresql",
    React: "react",
    "Next.js": "nextjs",
    "Node.js": "nodejs",
    "Express.js": "express",
    Vite: "vitejs",
    TailwindCSS: "tailwindcss",
    Bootstrap: "bootstrap",
    "REST APIs": "fastapi",
    Git: "git",
    Vercel: "vercel",
  };

  return iconMap[tech] || tech.toLowerCase().replace(/[.\s]/g, "");
}

export default function TechStack() {
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
      id="tech-stack"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div
        ref={contentRef}
        className="max-w-6xl mx-auto w-full opacity-0 translate-y-8 transition-all duration-700"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-12 font-sans text-center">
          Tech Stack
        </h2>
        <div className="grid grid-cols-4 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-8 gap-6">
          {technologies.map((tech, techIndex) => (
            <div
              key={techIndex}
              className="flex flex-col items-center justify-center group cursor-pointer"
            >
              <div className="w-full aspect-square max-w-[128px] rounded-lg bg-[#313244] border-2 border-[#45475a] flex flex-col items-center justify-center p-3 group-hover:bg-[#45475a] group-hover:border-[#89b4fa] transition-all duration-300 group-hover:scale-105">
                <Image
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${getIconName(
                    tech
                  )}/${getIconName(tech)}-original.svg`}
                  alt={tech}
                  width={64}
                  height={64}
                  className="w-16 h-16 sm:w-14 sm:h-14 sm:mb-2"
                  unoptimized
                />
                <span className="text-xs text-[#bac2de] font-mono text-center group-hover:text-[#89b4fa] transition-colors duration-300 hidden sm:block">
                  {tech}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
