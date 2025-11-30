import Navigation from '@/components/home/Navigation';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Projects from '@/components/home/Projects';
import Experience from '@/components/home/Experience';
import TechStack from '@/components/home/TechStack';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1e1e2e]">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <TechStack />
    </main>
  );
}
