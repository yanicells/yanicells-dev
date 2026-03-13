export interface Experience {
  title: string;
  organization: string;
  org?: string; // Shorter version for mobile
  date: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    title: "AI Solution Development Intern",
    organization: "Eskwelabs",
    org: "Eskwelabs",
    date: "Feb 2026 - Present",
    description:
      "Design and deploy AI agents and multi-step workflows that automate analytics, content, and operational tasks. Built reusable prompt templates and structured output schemas. Implement fallback logic and lightweight scripts to reduce manual review and speed QA cycles. Translate ambiguous requests into scoped AI use cases.",
  },
  {
    title: "Freelance Full-Stack Developer",
    organization: "Timoga Holiday Resort",
    org: "Timoga Holiday",
    date: "Dec 2025 - Present",
    description:
      "Developing a full-stack POS and management system handling entrance tracking, multi-cottage reservations, and payroll automation. Created a promotional website with online booking, interactive gallery, and AI-powered customer support using Next.js and Drizzle ORM.",
  },
  {
    title: "IT Skills & Development Officer",
    organization: "Ateneo Management Information Systems Association",
    org: "Ateneo MISA",
    date: "Aug 2025 - Present",
    description:
      "Organize technical skill trainings and workshops for students interested in information systems and technology. Assist in developing and maintaining organizational websites and systems to support association activities.",
  },
  {
    title: "Developer",
    organization: "Computer Society of the Ateneo",
    org: "CompSAt",
    date: "Oct 2025 - Present",
    description:
      "Developed and deployed software solutions for organizational events and client projects including websites and web applications. Ensured software implementations met professional standards and served project requirements effectively.",
  },
  {
    title: "Backend Developer",
    organization: "Google Developer Groups on Campus Loyola",
    org: "GDGoc - Loyola",
    date: "Sept 2025 - Present",
    description:
      "Designed and maintained server-side applications, databases, and APIs ensuring secure and scalable data handling. Collaborated with front-end developers to integrate user-facing features with back-end logic. Monitored and optimized system performance to maintain reliability and speed.",
  },
  {
    title: "Geekshop Documentation Core Team",
    organization: "Computer Society of the Ateneo",
    org: "CompSAt",
    date: "Jul 2025 - Jan 2026",
    description:
      "Managed photo and video documentation for events and tracked organizational records. Contributed to event coverage and visual storytelling for Ateneo's computer science community.",
  },
  {
    title: "Writing Assistant",
    organization: "ARISE - SOSE Newsletter",
    org: "ARISE",
    date: "Feb 2025 - Sept 2025",
    description:
      "Contributed to interviewing, article writing, and editing for the School of Science and Engineering newsletter. Collaborated with editorial team to produce engaging content for Ateneo's SOSE community.",
  },
  {
    title: "Bachelor of Science in Computer Science",
    organization: "Ateneo de Manila University",
    org: "ADMU",
    date: "Aug 2024 - Present",
    description:
      "Pursuing my BS Computer Science degree at my dream university — Ateneo de Manila University, consistently ranked as the top university in the Philippines. Admitted as a Financial Aid Scholar and DOST Scholar.",
  },
  {
    title: "STEM Strand Vice Governor",
    organization: "Supreme Student Government",
    org: "SSG",
    date: "Aug 2023 - May 2024",
    description:
      "Assisted events such as Sportsfest, La Salle Fair, and Jumpstart at La Salle Academy. Developed leadership, logistics, time management, and project coordination skills through event management.",
  },
];
