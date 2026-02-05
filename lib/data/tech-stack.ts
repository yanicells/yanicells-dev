export type TechCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "tools";

export interface TechItem {
  name: string;
  phrase: string;
  icon: string;
  category: TechCategory;
  isFeatured: boolean;
}

export const categoryLabels: Record<TechCategory, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
};

export const categoryDescriptions: Record<TechCategory, string> = {
  languages: "Core programming languages I work with",
  frontend: "UI frameworks and styling tools",
  backend: "Server-side frameworks and runtimes",
  database: "Data storage and management",
  tools: "Development and deployment tools",
};

export const techStack: TechItem[] = [
  // Languages
  {
    name: "TypeScript",
    phrase: "Type-safe JavaScript for scalable apps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "languages",
    isFeatured: true,
  },
  {
    name: "JavaScript",
    phrase: "The language of the web",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "languages",
    isFeatured: false,
  },
  {
    name: "Java",
    phrase: "Object-oriented programming language",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "languages",
    isFeatured: false,
  },
  {
    name: "Python",
    phrase: "Scripting and automation",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "languages",
    isFeatured: false,
  },
  {
    name: "HTML/CSS",
    phrase: "Web structure and styling",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "languages",
    isFeatured: false,
  },

  // Frontend
  {
    name: "React",
    phrase: "Component-based UI library",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "frontend",
    isFeatured: true,
  },
  {
    name: "Next.js",
    phrase: "Full-stack React framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "frontend",
    isFeatured: true,
  },
  {
    name: "TailwindCSS",
    phrase: "Utility-first CSS framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "frontend",
    isFeatured: false,
  },
  {
    name: "Vite",
    phrase: "Frontend build tool",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    category: "frontend",
    isFeatured: false,
  },
  {
    name: "Bootstrap",
    phrase: "CSS component library",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    category: "frontend",
    isFeatured: false,
  },

  // Backend
  {
    name: "Node.js",
    phrase: "JavaScript runtime for servers",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "backend",
    isFeatured: false,
  },
  {
    name: "Express.js",
    phrase: "Minimal web framework for Node",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    category: "backend",
    isFeatured: false,
  },

  // Database
  {
    name: "PostgreSQL",
    phrase: "Open-source SQL database",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "database",
    isFeatured: true,
  },

  // Tools
  {
    name: "Git",
    phrase: "Version control system",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "tools",
    isFeatured: false,
  },
  {
    name: "Vercel",
    phrase: "Deployment platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    category: "tools",
    isFeatured: false,
  },
];

export function getTechByCategory(category: TechCategory): TechItem[] {
  return techStack.filter((tech) => tech.category === category);
}

export function getFeaturedTech(): TechItem[] {
  return techStack.filter((tech) => tech.isFeatured);
}
