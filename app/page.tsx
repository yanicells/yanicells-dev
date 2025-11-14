import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import TechStack from '@/components/TechStack';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1e1e2e]">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <TechStack />
    </main>
  );
}
