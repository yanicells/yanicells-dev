interface ProjectSection {
  title: string;
  paragraphs: string[];
}

interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  slug: string;
  context: string;
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
    description:
      "A personality quiz matching students with Philippine universities, with student insights and an anonymous freedom wall.",
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
    title: "Eskwelabs AI tools",
    slug: "eskwelabs-capstone",
    context: "Internship work, 2026",
    description:
      "Article drafting and slide generation tools built for the CEO and learning designers at Eskwelabs.",
    outcome:
      "Writing samples, draft comparisons, and more reliable slide output.",
    role: "Article drafter Phase 2 and slide generator AI improvements",
    tech: ["Node.js", "LLMs", "Prompt engineering"],
    image: "/projects/tldrafter.png",
    imageWidth: 1896,
    imageHeight: 1054,
    imageAlt:
      "Thought Leader Drafter interface for generating articles from writing samples",
    links: [
      { label: "Project portfolio", href: "https://eskwelabs.yanicells.dev/" },
      {
        label: "Article drafter",
        href: "https://esk-tl-drafter-web.vercel.app/",
      },
      {
        label: "Slide generator",
        href: "https://eskwelabs-instructor-slides.vercel.app/",
      },
    ],
    sections: [
      {
        title: "Article drafting",
        paragraphs: [
          "The Thought Leader Drafter uses past articles to help the Eskwelabs CEO draft in his own voice. I inherited the first MVP and owned the second phase.",
          "I added a library of PDF writing samples, extracted their text, and connected them to drafting sessions. I also built side-by-side draft comparisons using one model call, then refactored the pipeline to handle three to five full articles as style references.",
        ],
      },
      {
        title: "Instructor slides",
        paragraphs: [
          "I worked on version 1.1 of the slide generator, focusing on its AI output. I added a check for generic content, matched prompt character limits to the interface's text boxes, and built an independent fallback for speaker notes when the main generation failed.",
          "Both projects were part of the Eskwelabs Innovation Fellowship, which ran from February to May 2026. They were built for internal use by the CEO and learning designers.",
        ],
      },
    ],
  },
  {
    title: "Meera",
    slug: "meera",
    context: "Team hackathon project, 2026",
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

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
