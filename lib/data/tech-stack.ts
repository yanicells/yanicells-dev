export type TechCategory =
  | "languages"
  | "certificates"
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
  certificates: "Certificates",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
};

export const categoryDescriptions: Record<TechCategory, string> = {
  languages: "Core programming languages I work with",
  certificates: "Recent certifications and intensive courses",
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
    phrase: "OOP, Multithreading, and Networking",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "languages",
    isFeatured: false,
  },
  {
    name: "SQL",
    phrase: "Database querying and relational data modeling",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "languages",
    isFeatured: false,
  },
  {
    name: "Python",
    phrase: "Basic scripting and automation",
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

  // Certificates
  {
    name: "Build a Fullstack Next.js App, v4",
    phrase:
      "Frontend Masters · Auth, Redis caching, CI/CD pipelines, and end-to-end testing",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "certificates",
    isFeatured: false,
  },
  {
    name: "Intermediate React, v6",
    phrase:
      "Frontend Masters · RSCs, SSR/SSG patterns, and advanced performance tuning",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "certificates",
    isFeatured: false,
  },
  {
    name: "Next.js Fundamentals, v4",
    phrase:
      "Frontend Masters · Routing, middleware, API routes, and practical caching strategies",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "certificates",
    isFeatured: false,
  },
  {
    name: "Complete Intro to React, v9",
    phrase:
      "Frontend Masters · State management, testing workflows, and React 19 capabilities",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "certificates",
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
    name: "Tailwind CSS",
    phrase: "Utility-first CSS framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "frontend",
    isFeatured: false,
  },
  {
    name: "shadcn UI",
    phrase: "Reusable component system for modern interfaces",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/shadcnui.svg",
    category: "frontend",
    isFeatured: false,
  },
  {
    name: "Framer Motion",
    phrase: "Animation library for smooth UI interactions",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/framer.svg",
    category: "frontend",
    isFeatured: false,
  },
  {
    name: "Zustand",
    phrase: "Lightweight state management for React apps",
    icon: "https://raw.githubusercontent.com/pmndrs/zustand/main/docs/bear.jpg",
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
    name: "Express",
    phrase: "Backend framework for API and server logic",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    category: "backend",
    isFeatured: false,
  },
  {
    name: "Next.js Server Actions",
    phrase: "Preferred pattern for direct database workflows",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "backend",
    isFeatured: false,
  },
  {
    name: "Better Auth",
    phrase: "Authentication and session management system",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/betterauth.svg",
    category: "backend",
    isFeatured: false,
  },
  {
    name: "Resend",
    phrase: "Transactional email delivery service",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/resend.svg",
    category: "backend",
    isFeatured: false,
  },
  {
    name: "Bun",
    phrase: "JavaScript runtime and package manager",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg",
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
  {
    name: "Neon",
    phrase: "Serverless Postgres hosting platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "database",
    isFeatured: false,
  },
  {
    name: "Supabase",
    phrase: "Backend-as-a-service on top of Postgres",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    category: "database",
    isFeatured: false,
  },
  {
    name: "Convex",
    phrase: "Backend platform for realtime app data",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/convex.svg",
    category: "database",
    isFeatured: false,
  },
  {
    name: "Drizzle ORM",
    phrase: "Type-safe ORM for relational databases",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/drizzle.svg",
    category: "database",
    isFeatured: false,
  },

  // Tools
  {
    name: "VS Code",
    phrase: "Primary editor with GitHub Copilot",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    category: "tools",
    isFeatured: false,
  },
  {
    name: "Git/GitHub",
    phrase: "Version control and collaboration workflow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "tools",
    isFeatured: false,
  },
  {
    name: "Postman",
    phrase: "API testing and request inspection",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
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
  {
    name: "Docker",
    phrase: "Containerization for app environments",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
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
