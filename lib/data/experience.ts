interface Experience {
  organization: string;
  title: string;
  date: string;
  description: string;
}

// Start dates avoid assuming that older records still describe current roles.
export const experiences: Experience[] = [
  {
    organization: "Diffusr",
    title: "AI Engineering Intern",
    date: "Started Jun 2026",
    description:
      "AI video pipelines, vision quality checks, and cloud job tracking.",
  },
  {
    organization: "JWay Group",
    title: "AI Engineering & Product Innovation Intern",
    date: "Started May 2026",
    description: "AI product prototypes with document ingestion and retrieval.",
  },
  {
    organization: "Eskwelabs",
    title: "AI Solution Development Intern",
    date: "Feb to May 2026",
    description:
      "Internal AI tools for article drafting and instructor slides.",
  },
  {
    organization: "Timoga Holiday Resort",
    title: "Freelance Full-Stack Developer",
    date: "Started Dec 2025",
    description:
      "Point-of-sale, reservations, and payroll management software.",
  },
];
