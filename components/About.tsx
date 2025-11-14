'use client';

import { useEffect, useRef } from 'react';

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20"
    >
      <div ref={contentRef} className="max-w-3xl mx-auto opacity-0 translate-y-8 transition-all duration-700">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-8 font-sans text-center">
          About Me
        </h2>
        <div className="space-y-4 text-[#bac2de] font-sans leading-relaxed">
          <p>
            I&apos;m a passionate full stack developer with a love for creating
            elegant and efficient solutions to complex problems. With experience
            in modern web technologies, I enjoy building applications that are
            both functional and beautiful.
          </p>
          <p>
            My journey in software development has been driven by curiosity and
            a constant desire to learn. I believe in writing clean, maintainable
            code and staying up-to-date with the latest industry trends and best
            practices.
          </p>
          <p>
            When I&apos;m not coding, you can find me exploring new technologies,
            contributing to open source projects, or sharing knowledge with the
            developer community.
          </p>
        </div>
      </div>
    </section>
  );
}

