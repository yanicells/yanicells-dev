interface ProjectSection {
  title: string;
  paragraphs: string[];
}

interface ProjectLink {
  label: string;
  href: string;
}

export type ProjectCategory = "AI" | "Web" | "Games" | "Org work";

export interface Project {
  title: string;
  slug: string;
  context: string;
  category: ProjectCategory;
  description: string;
  outcome: string;
  role: string;
  tech: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  links: ProjectLink[];
  sections: ProjectSection[];
}

// Curated from the portfolio's project records; team work is credited explicitly.
export const projects: Project[] = [
  {
    title: "UniSort",
    slug: "unisort",
    context: "Personal project, 2026",
    category: "Web",
    description:
      "A personality quiz matching students with Philippine universities.",
    outcome: "30,000+ visitors in its first two weeks.",
    role: "Design and full-stack development",
    tech: ["Next.js", "Drizzle", "Neon"],
    image: "/projects/unisort.png",
    imageWidth: 1610,
    imageHeight: 984,
    imageAlt:
      "UniSort's university quiz, with match results for Ateneo, La Salle, UP, and UST",
    links: [
      { label: "Visit website", href: "https://unisort.ycells.com" },
      { label: "Source code", href: "https://github.com/yanicells/UniSort" },
    ],
    sections: [
      {
        title: "The project",
        paragraphs: [
          "I built UniSort over the semester break to practice Next.js. The quiz matches people with Ateneo, La Salle, UP, or UST using weighted scores across several dimensions. I gathered student opinions on university subreddits to inform the questions and results.",
          "The app also includes an anonymous freedom wall and analytics for quiz results. I built the application and deployed it publicly.",
        ],
      },
      {
        title: "What happened after launch",
        paragraphs: [
          "After I shared it in university subreddits, the app reached over 30,000 visitors, 20,000 quiz entries, and 60,000 pageviews in two weeks. Those figures describe the launch period in February 2026.",
        ],
      },
    ],
  },
  {
    title: "Academic Ally",
    slug: "academic-ally",
    context: "Team hackathon project, 2026",
    category: "AI",
    description:
      "A study companion that turns course syllabi into a plan for what to work on next.",
    outcome: "From syllabus upload to a daily study plan.",
    role: "Team development",
    tech: ["Electron", "LLMs", "Agent orchestration"],
    image: "/projects/Ally.png",
    imageWidth: 2520,
    imageHeight: 1630,
    imageAlt: "Academic Ally's study planning interface",
    links: [
      { label: "Source code", href: "https://github.com/CJ-Uy/ally" },
      {
        label: "Watch demo",
        href: "https://drive.google.com/file/d/15Q4Mmi2oSgDRhbCu9G_vdNG7KhKOb3uw/view?usp=sharing",
      },
    ],
    sections: [
      {
        title: "A plan from the syllabus",
        paragraphs: [
          "Our team built Ally to help students decide what to study next. Students upload their syllabi, review the extracted deadlines, exams, and grading weights, and confirm important details before anything is saved.",
          "The study plan considers due dates, grading weights, difficulty, available hours, and progress. A Today view brings overdue work, upcoming deadlines, and tasks at risk into one place. Focus sessions feed back into the plan as students work.",
        ],
      },
      {
        title: "Making the agents work together",
        paragraphs: [
          "An orchestrator coordinates five specialist agents for onboarding, syllabus extraction, diagnostics, workload planning, and execution. We evaluated their routing, extraction accuracy, and confirmation steps on a test set before connecting them to the product.",
          "The Electron app also has a mobile companion, paired through a QR code so the study plan can move between devices.",
        ],
      },
    ],
  },
  {
    title: "Schrollar",
    slug: "schrollar",
    context: "Team hackathon project, 2026",
    category: "AI",
    description:
      "A research feed for discovering papers, with summaries checked against their sources.",
    outcome: "Hackathon 2nd runner-up.",
    role: "Team development",
    tech: ["Node.js", "LLMs", "NLI", "Search"],
    image: "/projects/schrollar-dev.png",
    imageWidth: 1607,
    imageHeight: 1058,
    imageAlt: "Schrollar's research discovery feed",
    links: [
      { label: "Visit website", href: "https://schrollar.cjuy.dev/" },
      { label: "Source code", href: "https://github.com/CJ-Uy/schrollar" },
      {
        label: "Watch demo",
        href: "https://drive.google.com/file/d/1byUEwg-Fru-AgKieDlz2bmeEbIneJ10c/view?usp=sharing",
      },
    ],
    sections: [
      {
        title: "Research you can scroll through",
        paragraphs: [
          "Schrollar presents research in a feed, making it easier to browse papers before opening the full text. Our team built parallel search pipelines across academic sources and used LLMs to synthesize the results.",
          "We used natural language inference to check whether generated claims were supported by the source material. The aim was to make summaries useful without losing the connection to the papers behind them.",
        ],
      },
      {
        title: "The hackathon part",
        paragraphs: [
          "I messaged Niles about joining, then we brought in Gabe, Abby, and Charles. That became admulto. We spent late nights working at Aerie and filmed a demo together.",
          "We realized about an hour before the initial deadline that we still needed a submission deck. We rushed it, made the top seven, and somehow repeated the deck scramble on finals day. We finished as 2nd runner-up.",
        ],
      },
    ],
  },
  {
    title: "Meera",
    slug: "meera",
    context: "Team hackathon project, 2026",
    category: "AI",
    description:
      "An AI university help desk that answers student questions and hands structured cases to the right office.",
    outcome: "University support across web and desktop.",
    role: "Team development, including the desktop assistant",
    tech: ["Next.js", "Electron", "Cloudflare Workers", "LLMs"],
    image: "/projects/Meera.png",
    imageWidth: 2882,
    imageHeight: 1536,
    imageAlt:
      "Meera's university support interface and on-screen guidance preview",
    links: [
      { label: "Visit website", href: "https://meera.cjuy.dev/" },
      { label: "Source code", href: "https://github.com/CJ-Uy/meera" },
      {
        label: "Watch demo",
        href: "https://drive.google.com/file/d/19wZtPs06FDva6LXOHqcWFxf73D_CtkwC/view?usp=sharing",
      },
    ],
    sections: [
      {
        title: "The help desk",
        paragraphs: [
          "Our team built Meera for the KPMG Academic Innovation Challenge. Students describe a problem, and Meera tries to answer it or route it to IT, the Registrar, Finance, Health Services, or Student Services.",
          "When a person needs to take over, the system passes along a case summary, collected information, missing details, and suggested next steps. A knowledge graph checks the department proposed by the model before the case is routed.",
        ],
      },
      {
        title: "The desktop assistant",
        paragraphs: [
          "The desktop assistant uses transparent, click-through overlays to point at interface elements in other applications. A vision model locates the target, then a second, closer pass refines its position. This was the part of the project I was proudest of.",
          "The team used runtime adapters to run one Next.js codebase in the browser, Electron, and Cloudflare Workers. Model calls stay on the server. The assistant provides guidance and leaves payments, record changes, and medical decisions to people.",
        ],
      },
    ],
  },
  {
    title: "MISAyang Samahan",
    slug: "misayang-samahan",
    context: "Student organization work, 2025",
    category: "Org work",
    description:
      "A registration and quiz platform that assigns Ateneo MISA members to families, with tools for administrators.",
    outcome: "Used by 60+ members.",
    role: "Development with another MISA developer",
    tech: ["Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "/projects/misayang.png",
    imageWidth: 1412,
    imageHeight: 912,
    imageAlt:
      "MISAyang Samahan's Pokémon-themed member registration and family assignment platform",
    links: [{ label: "Visit website", href: "https://family.misa.org.ph" }],
    sections: [
      {
        title: "The platform",
        paragraphs: [
          "Members register, take a personality quiz, and get assigned to a family within Ateneo MISA. The platform also gives administrators tools to manage those assignments.",
          "I worked with another developer on a two-week deadline. More than 60 members used the platform. It was my first experience building software for an organization with real users and collaborating on a shared repository.",
        ],
      },
    ],
  },
];

export interface ProjectPreview {
  title: string;
  href: string;
  description: string;
  outcome?: string;
  image: string;
  imageAlt: string;
  category: ProjectCategory;
}

// Case-study text stays on the server; the gallery receives these small records.
export const projectPreviews: ProjectPreview[] = [
  ...projects.map(({ title, slug, description, outcome, image, imageAlt, category }) => ({
    title, href: `/projects/${slug}`, description, outcome, image, imageAlt, category,
  })),
  {
    title: "Benkyo",
    href: "https://github.com/yanicells/Benkyo",
    description: "Japanese vocabulary practice, built with a classmate.",
    image: "/projects/benkyo.png",
    imageAlt: "Benkyo's language learning interface",
    category: "Web",
  },
  {
    title: "Redhead Redemption",
    href: "https://github.com/yanicells/Redhead-Redemption",
    description: "A multiplayer Java game with pixel art and LAN play.",
    image: "/projects/redemption.png",
    imageAlt: "Redhead Redemption's top-down pixel art game",
    category: "Games",
  },
  {
    title: "Musicells",
    href: "https://github.com/yanicells/musicells",
    description: "A Spotify album browser with saved favourites.",
    image: "/projects/musicells.png",
    imageAlt: "Musicells' music discovery interface",
    category: "Web",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
