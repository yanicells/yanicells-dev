interface ProjectSection {
  title: string;
  paragraphs: string[];
}

interface ProjectLink {
  label: string;
  href: string;
}

interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export type ProjectCategory = "AI" | "Web" | "Games" | "Org work";

export interface Project {
  title: string;
  slug: string;
  context: string;
  category: ProjectCategory;
  featured: boolean;
  description: string;
  outcome: string;
  role: string;
  tech: string[];
  image?: ProjectImage;
  links: ProjectLink[];
  sections: ProjectSection[];
}

// Curated from the October 2026 career update; team contributions stay explicit.
export const projects: Project[] = [
  {
    title: "UniSort",
    slug: "unisort",
    context: "Personal project, 2025–2026",
    category: "Web",
    featured: true,
    description:
      "A personality quiz matching students with Philippine universities.",
    outcome: "55,000+ visitors and 35,000+ quiz entries as of Oct 2026.",
    role: "Design and full-stack development",
    tech: ["Next.js", "Drizzle", "Neon"],
    image: {
      src: "/projects/unisort.png",
      width: 1610,
      height: 984,
      alt: "UniSort's university quiz, with match results for Ateneo, La Salle, UP, and UST",
    },
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
          "As of October 2026, the figures I recorded from Vercel analytics were 55,000+ visitors, approximately 130,000+ page views, and 35,000+ quiz entries.",
        ],
      },
    ],
  },
  {
    title: "Airosu",
    slug: "airosu",
    context: "Personal project, 2026",
    category: "Games",
    featured: true,
    description:
      "A browser rhythm game played with hand movements in front of a webcam.",
    outcome: "On-device hand tracking and local osu! beatmaps.",
    role: "Product and development",
    tech: ["TypeScript", "MediaPipe", "PixiJS", "Web Audio"],
    image: {
      src: "/projects/airosu.png",
      width: 2146,
      height: 1170,
      alt: "Airosu's main menu, with settings, play, rankings, and profile options",
    },
    links: [{ label: "Source code", href: "https://github.com/yanicells/airosu" }],
    sections: [
      {
        title: "Playing with your hands",
        paragraphs: [
          "Airosu turns webcam hand movement into a cursor for playing osu! beatmaps in the browser. The playable version loads local .osz files and handles circles, sliders, spinners, scoring, and results. Camera frames stay on the device.",
          "The controls are calibrated and smoothed for a forgiving webcam experience. When tracking is lost, the game handles that state explicitly rather than treating an unreliable cursor as normal input.",
        ],
      },
      {
        title: "Keeping time",
        paragraphs: [
          "Gameplay follows the Web Audio clock. Hit detection and scoring live separately from rendering, so their timing rules can be checked without running the visual game.",
          "The current public version is an offline browser game. Account, leaderboard, and other online features remain work in progress.",
        ],
      },
    ],
  },
  {
    title: "SimplifyTrabaho",
    slug: "simplifytrabaho",
    context: "Personal project, 2026",
    category: "Web",
    featured: true,
    description:
      "A Philippine job directory refreshed from employers’ official hiring feeds.",
    outcome: "15,000+ active listings in the Oct 2, 2026 data snapshot.",
    role: "Product, data pipeline, and web development",
    tech: ["TypeScript", "Next.js", "GitHub Actions"],
    image: {
      src: "/projects/simplifytrabaho.png",
      width: 2012,
      height: 1258,
      alt: "The SimplifyTrabaho logo, a smiling briefcase beside the wordmark",
    },
    links: [
      { label: "Visit website", href: "https://simplifytrabaho.ycells.com" },
      { label: "Source code", href: "https://github.com/yanicells/SimplifyTrabaho" },
    ],
    sections: [
      {
        title: "Jobs from the source",
        paragraphs: [
          "SimplifyTrabaho brings Philippine job listings together from employers’ official applicant-tracking systems. It keeps listing facts and official application links, with filters, saved preferences, and a local application tracker.",
          "The pipeline normalizes thirteen different hiring-system formats into one listing schema. Daily refreshes run through GitHub Actions; inactive listings remain in the data instead of disappearing from its history.",
        ],
      },
      {
        title: "When a source fails",
        paragraphs: [
          "A failed or incomplete fetch does not mark unseen jobs as closed. Source failures remain visible, and stable record IDs keep refreshes from creating duplicates.",
          "Workday receives stricter treatment: robots checks, spaced requests, bounded pagination, and a persistent stop when a source blocks requests. The October 2 snapshot contained 15,262 active listings.",
        ],
      },
    ],
  },
  {
    title: "Academic Ally",
    slug: "academic-ally",
    context: "Team hackathon prototype, 2026",
    category: "AI",
    featured: true,
    description:
      "A study companion that turns course syllabi into a plan for what to work on next.",
    outcome: "Top 10 in Round 1, KPMG x Microsoft Academic Innovation Challenge 2026.",
    role: "Product requirements, desktop experience, and planner integration",
    tech: ["Electron", "LLMs", "Agent orchestration"],
    image: {
      src: "/projects/Ally.png",
      width: 2520,
      height: 1630,
      alt: "Academic Ally's study planning interface",
    },
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
          "Our team developed Ally to help students decide what to study next. The prototype parses syllabus deadlines, exams, grading weights, and topics, with planning tools for tasks and calendars.",
          "It explores onboarding, diagnostics, focus sessions, and a mobile companion. Some dashboard and calendar areas remain static or partial; this is a hackathon prototype.",
        ],
      },
      {
        title: "My part in the team",
        paragraphs: [
          "I worked on product requirements, the Electron shell, time-block behavior, calendar and task surfaces, desktop-orb chat, and local/cloud model integration.",
          "The five-agent architecture is shared team work. Ally reached the Top 10 in Round 1 of the KPMG x Microsoft Academic Innovation Challenge.",
        ],
      },
    ],
  },
  {
    title: "Schrollar",
    slug: "schrollar",
    context: "Team hackathon prototype, 2026",
    category: "AI",
    featured: true,
    description:
      "A research feed for discovering papers, with source-linked summaries and claim checks.",
    outcome: "2nd runner-up, HackFest 2026 Axis Case Challenge.",
    role: "Research workflow, interface integration, and model configuration",
    tech: ["Node.js", "LLMs", "NLI", "Search"],
    image: {
      src: "/projects/schrollar-dev.png",
      width: 1607,
      height: 1058,
      alt: "Schrollar's research discovery feed",
    },
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
          "My contributions focused on feed and detail views, onboarding, export, comments, source presentation, and model prompts/configuration, alongside some processing and grounding work. Search and infrastructure ownership are shared across the team.",
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
    context: "Team competition project, 2026",
    category: "AI",
    featured: true,
    description:
      "An AI university help desk that answers student questions and hands structured cases to the right office.",
    outcome: "Top 3, KPMG x Microsoft Academic Innovation Challenge 2026.",
    role: "Team development across AI routing, voice, and the desktop assistant",
    tech: ["Next.js", "Electron", "Cloudflare Workers", "LLMs"],
    image: {
      src: "/projects/Meera.png",
      width: 2882,
      height: 1536,
      alt: "Meera's university support interface and on-screen guidance preview",
    },
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
          "Our team built Meera for the KPMG x Microsoft Academic Innovation Challenge. Students describe a problem, and Meera tries to answer it or route it to IT, the Registrar, Finance, Health Services, or Student Services. We finished in the competition’s Top 3.",
          "When a person needs to take over, the system passes along a case summary, collected information, missing details, and suggested next steps. A knowledge graph checks the department proposed by the model before the case is routed.",
        ],
      },
      {
        title: "The desktop assistant",
        paragraphs: [
          "My contributions span graph-based routing, AI persistence, provider integration, voice interaction, and the desktop experience. The wider architecture is shared team work.",
          "The desktop assistant uses transparent, click-through overlays to point at interface elements in other applications. A vision model locates the target, then a second, closer pass refines its position. This was the part of the project I was proudest of.",
          "The team used runtime adapters to run one Next.js codebase in the browser, Electron, and Cloudflare Workers. Model calls stay on the server. The assistant provides guidance and leaves payments, record changes, and medical decisions to people.",
        ],
      },
    ],
  },
  {
    title: "Python Workshop",
    slug: "misa-python-workshop",
    context: "Student organization teaching, 2026",
    category: "Org work",
    featured: false,
    description:
      "A beginner Python and Git workshop where students build a MISA cluster quiz.",
    outcome: "Delivered to 30+ attendees.",
    role: "Workshop material development and teaching with MISA eServices",
    tech: ["Python", "Git", "Astro", "Starlight", "Google Colab"],
    image: {
      src: "/projects/misa-python-workshop.png",
      width: 2920,
      height: 1830,
      alt: "The Python Workshop guide, with step-by-step lessons for building a MISA cluster quiz",
    },
    links: [
      { label: "Workshop repository", href: "https://github.com/yanicells/misa-python-workshop" },
    ],
    sections: [
      {
        title: "Learning by building",
        paragraphs: [
          "The workshop introduces first-year BS MIS students to Python and Git through a cluster personality quiz. Lessons progress from input and conditions to loops, functions, and a complete 15-question weighted quiz.",
          "I developed the teaching material and helped deliver the workshop with MISA eServices. The guide includes reference checkpoints and recovery instructions, with Colab notebooks for students who cannot use a local setup. The workshop had 30+ attendees.",
        ],
      },
    ],
  },
  {
    title: "Cluster Finder",
    slug: "misa-cluster-finder",
    context: "Student organization work, 2026",
    category: "Org work",
    featured: false,
    description:
      "A short quiz that helps students find their strongest matches across MISA’s seven clusters.",
    outcome: "The workshop quiz adapted into a web experience.",
    role: "Web application development",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: {
      src: "/projects/misa-cluster-finder.png",
      width: 2374,
      height: 1722,
      alt: "Cluster Finder's welcome screen, with a name tag and a Find my cluster button",
    },
    links: [],
    sections: [
      {
        title: "From workshop to website",
        paragraphs: [
          "I adapted the Python workshop’s quiz into a responsive name-tag, question, and results flow. It preserves the same 15 questions, answer weights, and seven cluster descriptions.",
          "Results show the three highest positive score levels and keep every tie. Names and answers stay in browser memory and clear when the quiz is restarted or the page is refreshed.",
        ],
      },
    ],
  },
  {
    title: "MISA Website",
    slug: "misa-website",
    context: "Student organization work, 2026",
    category: "Org work",
    featured: false,
    description:
      "Ateneo MISA’s organization website, covering events, departments, and technology services.",
    outcome: "Website revamp and Services page integration.",
    role: "Website development and team integration",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: {
      src: "/projects/misa-website.png",
      width: 2700,
      height: 1808,
      alt: "Ateneo MISA's homepage, with an announcement, organization introduction, and group photo",
    },
    links: [{ label: "Visit website", href: "https://misa.org.ph" }],
    sections: [
      {
        title: "The organization’s home online",
        paragraphs: [
          "The revamp brings MISA’s home, events, departments, about, and contact pages into a shared visual system, with responsive navigation and layouts.",
          "I rebuilt major website surfaces and implemented the contact form’s Google Sheets integration. Later, I integrated the team’s Services page work, reconciling the design, artwork, interactions, and mobile layouts.",
        ],
      },
    ],
  },
  {
    title: "MISAyang Samahan",
    slug: "misayang-samahan",
    context: "Student organization work, 2025",
    category: "Org work",
    featured: false,
    description:
      "A registration and quiz platform that assigns Ateneo MISA members to families, with tools for administrators.",
    outcome: "Used by 70+ members.",
    role: "Development with another MISA developer",
    tech: ["Node.js", "PostgreSQL", "Tailwind CSS"],
    image: {
      src: "/projects/misayang.png",
      width: 1412,
      height: 912,
      alt: "MISAyang Samahan's Pokémon-themed member registration and family assignment platform",
    },
    links: [{ label: "Visit website", href: "https://family.misa.org.ph" }],
    sections: [
      {
        title: "The platform",
        paragraphs: [
          "Members register, take a personality quiz, and get assigned to a family within Ateneo MISA. The platform also gives administrators tools to manage those assignments.",
          "I worked with another developer on a two-week deadline, contributing application/database setup, family-balancing logic, and interface integration. More than 70 members used the platform. It was my first experience building software for an organization with real users and collaborating on a shared repository.",
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
  image?: Pick<ProjectImage, "src" | "alt">;
  category: ProjectCategory;
  featured: boolean;
}

// Case-study text stays on the server; the gallery receives these small records.
export const projectPreviews: ProjectPreview[] = [
  ...projects.map(({ title, slug, description, outcome, image, category, featured }) => ({
    title,
    href: `/projects/${slug}`,
    description,
    outcome,
    image: image ? { src: image.src, alt: image.alt } : undefined,
    category,
    featured,
  })),
  {
    title: "Benkyo",
    href: "https://github.com/yanicells/Benkyo",
    description: "Japanese vocabulary practice with spaced review and local/cloud progress sync.",
    image: { src: "/projects/benkyo.png", alt: "Benkyo's language learning interface" },
    category: "Web",
    featured: false,
  },
  {
    title: "Redhead Redemption",
    href: "https://github.com/yanicells/Redhead-Redemption",
    description: "A multiplayer Java game with pixel art and LAN play.",
    image: { src: "/projects/redemption.png", alt: "Redhead Redemption's top-down pixel art game" },
    category: "Games",
    featured: false,
  },
  {
    title: "Musicells",
    href: "https://github.com/yanicells/musicells",
    description: "An early Spotify album-browser project with saved favourites.",
    image: { src: "/projects/musicells.png", alt: "Musicells' music discovery interface" },
    category: "Web",
    featured: false,
  },
];

export const homepageProjectPreviews = projectPreviews.filter(({ href }) =>
  ["/projects/unisort", "/projects/airosu", "/projects/meera"].includes(href),
);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
