'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show hero content immediately on mount
    if (contentRef.current) {
      contentRef.current.classList.remove('opacity-0');
      contentRef.current.classList.add('animate-slide-up');
    }

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
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-16"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto text-center opacity-0 translate-y-8 transition-all duration-700">
        {/* Profile Image Placeholder */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#89b4fa] to-[#cba6f7] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="text-4xl sm:text-5xl font-mono text-[#1e1e2e] font-bold">
              Y
            </span>
          </div>
        </div>

        {/* Name and Tagline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#cdd6f4] mb-4 font-sans">
          Yani Cells
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[#bac2de] mb-2 font-sans">
          Full Stack Developer
        </p>
        <p className="text-base sm:text-lg text-[#a6adc8] font-mono">
          Building digital experiences with code
        </p>
      </div>
    </section>
  );
}

