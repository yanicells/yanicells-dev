'use client';

import { useEffect, useRef } from 'react';

interface TechCategory {
  category: string;
  technologies: string[];
}

const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'Tools & Others',
    technologies: ['Git', 'Docker', 'AWS', 'Linux', 'Figma'],
  },
];

export default function TechStack() {
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
      id="tech-stack"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto w-full opacity-0 translate-y-8 transition-all duration-700">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-12 font-sans text-center">
          Tech Stack
        </h2>
        <div className="space-y-12">
          {techStack.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-xl font-semibold text-[#89b4fa] mb-6 font-sans text-center">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    {/* Icon placeholder */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#313244] border-2 border-[#45475a] flex items-center justify-center mb-3 group-hover:bg-[#45475a] group-hover:border-[#89b4fa] transition-all duration-300 group-hover:scale-110">
                      <span className="text-2xl font-mono text-[#89b4fa] font-bold">
                        {tech.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-[#bac2de] font-mono text-center group-hover:text-[#89b4fa] transition-colors duration-300">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

