'use client';

import { useEffect, useRef } from 'react';

interface Project {
  title: string;
  description: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce solution with payment integration, inventory management, and admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
  },
  {
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
  },
  {
    title: 'Weather Dashboard',
    description:
      'A beautiful weather dashboard that displays current conditions, forecasts, and interactive maps with location-based data.',
    tech: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
  },
  {
    title: 'Social Media Analytics',
    description:
      'Analytics platform for tracking social media metrics, generating reports, and visualizing engagement data across multiple platforms.',
    tech: ['Next.js', 'Python', 'D3.js', 'Redis'],
  },
  {
    title: 'Learning Management System',
    description:
      'An educational platform for creating courses, managing students, tracking progress, and delivering interactive content.',
    tech: ['React', 'Express', 'PostgreSQL', 'AWS S3'],
  },
  {
    title: 'Portfolio Website',
    description:
      'A modern, responsive portfolio website showcasing projects, skills, and experience with smooth animations and clean design.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
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
            contentRef.current.classList.remove('animate-slide-up', 'opacity-0');
            // Trigger reflow to restart animation
            void contentRef.current.offsetWidth;
            contentRef.current.classList.add('animate-slide-up');
          } else if (contentRef.current) {
            contentRef.current.classList.remove('animate-slide-up');
            contentRef.current.classList.add('opacity-0');
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
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto w-full opacity-0 translate-y-8 transition-all duration-700">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-12 font-sans text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#313244] rounded-lg p-6 hover:bg-[#45475a] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-[#45475a] hover:border-[#89b4fa]"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}

