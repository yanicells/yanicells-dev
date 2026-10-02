interface Experience {
  organization: string;
  title: string;
  date: string;
  summary: string;
  description: string;
}

// Start dates avoid assuming that older records still describe current roles.
export const experiences: Experience[] = [
  {
    organization: "Diffusr",
    title: "AI Engineering Intern",
    date: "Started Jun 2026",
    summary: "AI video pipelines, vision quality checks, and cloud job tracking.",
    description:
      "Worked on AI video pipelines and creator analytics. Improved vision quality checks, asynchronous GCP endpoints, scheduled refreshes, and Supabase job tracking for campaign operations.",
  },
  {
    organization: "JWay Group",
    title: "AI Engineering & Product Innovation Intern",
    date: "Started May 2026",
    summary: "AI product prototypes with document ingestion and retrieval.",
    description:
      "Built a self-hosted n8n and retrieval prototype for legacy and memory use cases. The workflow brings in scanned documents and audio, retrieves relevant material, and connects to an authenticated React interface.",
  },
  {
    organization: "Timoga Holiday Resort",
    title: "Freelance Full-Stack Developer",
    date: "Started Dec 2025",
    summary: "Point-of-sale, reservations, and payroll management software.",
    description:
      "Developed a point-of-sale and management system for entrance tracking, cottage reservations, and payroll. Also built a promotional website with online booking, a gallery, and AI customer support using Next.js and Drizzle.",
  },
  {
    organization: "Ateneo MISA",
    title: "IT Skills & Development Officer",
    date: "Started Aug 2025",
    summary: "Student workshops and websites for the organization.",
    description:
      "Organized technical training and workshops for students interested in information systems and technology. Helped develop and maintain websites and systems for the association’s activities.",
  },
];
