"use client";

import { useEffect, useRef } from "react";

interface ExperienceItem {
  company: string;
  role: string;
  dateRange: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Timoga Holiday Resort Iligan City",
    role: "Freelance Full-Stack Developer",
    dateRange: "December 2025 - Present",
    description:
      "Developing a full-stack POS and management system handling entrance tracking, multi-cottage reservations, and payroll automation. Created a promotional website with online booking, interactive gallery, and AI-powered customer support using Next.js and Drizzle ORM.",
  },
  {
    company: "Ateneo Management Information Systems Association",
    role: "IT Skills & Development Officer",
    dateRange: "August 2025 - Present",
    description:
      "Organize technical skill trainings and workshops for students interested in information systems and technology. Assist in developing and maintaining organizational websites and systems to support association activities.",
  },
  {
    company: "Computer Society of the Ateneo",
    role: "Developer",
    dateRange: "October 2025 - Present",
    description:
      "Developed and deployed software solutions for organizational events and client projects including websites and web applications. Ensured software implementations met professional standards and served project requirements effectively.",
  },
  {
    company: "Google Developer Groups on Campus Loyola",
    role: "Backend Developer",
    dateRange: "September 2025 - Present",
    description:
      "Designed and maintained server-side applications, databases, and APIs ensuring secure and scalable data handling. Collaborated with front-end developers to integrate user-facing features with back-end logic. Monitored and optimized system performance to maintain reliability and speed.",
  },
  {
    company: "Computer Society of the Ateneo",
    role: "Geekshop Documentation Core Team",
    dateRange: "July 2025 - Present",
    description:
      "Managed photo and video documentation for events and tracked organizational records. Contributed to event coverage and visual storytelling for Ateneo's computer science community.",
  },
  {
    company: "ARISE - SOSE Newsletter",
    role: "Writing Assistant",
    dateRange: "2025 - Present",
    description:
      "Contributed to interviewing, article writing, and editing for the School of Science and Engineering newsletter. Collaborated with editorial team to produce engaging content for Ateneo's SOSE community.",
  },
  {
    company: "Supreme Student Government",
    role: "STEM Strand Vice Governor",
    dateRange: "2023 - 2024",
    description:
      "Assisted events such as Sportsfest, La Salle Fair, and Jumpstart at La Salle Academy. Developed leadership, logistics, time management, and project coordination skills through event management.",
  },
];

export default function Experience() {
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
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto w-full opacity-0 translate-y-8 transition-all duration-700"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-12 font-sans text-center">
          Experience
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#45475a] hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-0 md:pl-20 hover:translate-x-2 transition-transform duration-300"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 w-4 h-4 bg-[#89b4fa] rounded-full border-4 border-[#1e1e2e] hidden md:block z-10" />

                <div className="bg-[#313244] rounded-lg p-6 hover:bg-[#45475a] transition-all duration-300 hover:shadow-lg border border-[#45475a] hover:border-[#89b4fa]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-xl font-semibold text-[#cdd6f4] font-sans">
                      {exp.role}
                    </h3>
                    <span className="text-sm text-[#89b4fa] font-mono mt-1 sm:mt-0">
                      {exp.dateRange}
                    </span>
                  </div>
                  <p className="text-[#bac2de] font-semibold mb-2 font-sans">
                    {exp.company}
                  </p>
                  <p className="text-[#bac2de] font-sans text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
