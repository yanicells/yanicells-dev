export type ProjectCategory = "webdev" | "java";

export interface Project {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  tech: string[];
  repo?: string;
  demo?: string;
  image: string;
  category: ProjectCategory;
  isFeatured: boolean;
}

export const projects: Project[] = [
  {
    title: "UniSort",
    slug: "unisort",
    description:
      "A university matching platform featuring a weighted multi-dimensional scoring algorithm, research-backed quizzes, and an anonymous Freedom Wall with real-time analytics.",
    shortDescription: "University matching platform with quizzes and analytics",
    tech: ["Next.js", "Drizzle", "Neon"],
    repo: "https://github.com/yanicells/UniSort",
    demo: "https://unisort.ycells.com",
    image: "/projects/unisort.png",
    category: "webdev",
    isFeatured: true,
  },
  {
    title: "MISAyang Samahan",
    slug: "misayang-samahan",
    description:
      "A Pokémon-themed HR platform for MISA with quiz-based sorting, admin tools, and family assignments used by 60+ members.",
    shortDescription: "Pokémon-themed HR platform with quiz-based sorting",
    tech: ["Node.js", "PostgreSQL", "TailwindCSS"],
    demo: "https://family.misa.org.ph",
    image: "/projects/misayang.png",
    category: "webdev",
    isFeatured: true,
  },
  {
    title: "Redhead Redemption",
    slug: "redhead-redemption",
    description:
      "A LAN-based multiplayer top-down shooter with custom networking, enemy AI, leveling systems, and hand-drawn pixel art assets.",
    shortDescription: "LAN multiplayer top-down shooter with pixel art",
    tech: ["Java", "Sockets", "Multithreading"],
    repo: "https://github.com/yanicells/Redhead-Redemption",
    demo: "https://drive.google.com/file/d/1TRlHSFsdRRIZ71WZ5kfUPuQtJw5qbnDf/view",
    image: "/projects/redemption.png",
    category: "java",
    isFeatured: true,
  },
  {
    title: "Chika",
    slug: "chika",
    description:
      "A personalized freedom wall app that allows users to post anonymous messages and interact with others' posts.",
    shortDescription: "Anonymous freedom wall for posting messages",
    tech: ["Next.js", "Neon", "PostgreSQL"],
    repo: "https://github.com/yanicells/chika",
    demo: "https://chika.yanicells.dev",
    image: "/projects/chika.png",
    category: "webdev",
    isFeatured: true,
  },
  {
    title: "CityCraft",
    slug: "citycraft",
    description:
      "An interactive 2D animated cityscape with dual-player control, dynamic weather, fireworks, and environmental sound effects.",
    shortDescription: "Interactive 2D animated cityscape simulation",
    tech: ["Java", "Swing", "Multithreading"],
    repo: "https://github.com/yanicells/CityCraft",
    image: "/projects/citycraft.png",
    category: "java",
    isFeatured: false,
  },
  {
    title: "Musicells",
    slug: "musicells",
    description:
      "A music discovery app using Spotify's API to browse albums, view new releases, and save favorites.",
    shortDescription: "Music discovery app with Spotify integration",
    tech: ["React", "Zustand", "Spotify API"],
    repo: "https://github.com/yanicells/musicells",
    demo: "https://musicells.yanicells.dev",
    image: "/projects/musicells.png",
    category: "webdev",
    isFeatured: false,
  },
  {
    title: "NASA APIs Explorer",
    slug: "nasa-apis",
    description:
      "A web app that integrates multiple NASA APIs to display astronomy images, media libraries, and Mars rover data.",
    shortDescription: "Explore NASA APIs, astronomy images, and Mars data",
    tech: ["Node.js", "TailwindCSS", "REST APIs"],
    repo: "https://github.com/yanicells/NASA-APIs",
    demo: "https://drive.google.com/file/d/1n3MuIYU4EHJ0Kgk4n10nx89EVc9-OFR8/view",
    image: "/projects/nasa.png",
    category: "webdev",
    isFeatured: false,
  },
  {
    title: "Pixcells",
    slug: "pixcells",
    description:
      "My photography and videography portfolio. Showcasing my work with a clean and responsive design.",
    shortDescription: "Photography and videography portfolio",
    tech: ["Next.js", "React", "TailwindCSS"],
    repo: "https://github.com/yanicells/pixcells",
    demo: "https://pixcells.yanicells.dev",
    image: "/projects/pixcells.png",
    category: "webdev",
    isFeatured: false,
  },
  {
    title: "Blogcells",
    slug: "blogcells",
    description:
      "A blogging platform where users can create posts, leave comments, and like content with a clean interface.",
    shortDescription: "Blogging platform with comments and likes",
    tech: ["Node.js", "TailwindCSS", "PostgreSQL"],
    repo: "https://github.com/yanicells/Blogcells",
    demo: "https://drive.google.com/file/d/1RS3xFCqgAiJHtbu3laanLfSTznuTugma/view",
    image: "/projects/blogcells.png",
    category: "webdev",
    isFeatured: false,
  },
  {
    title: "Travel-Tracker",
    slug: "travel-tracker",
    description:
      "Track and visualize countries you've visited using ISO codes, with user profiles and country management features.",
    shortDescription: "Track and visualize countries you've visited",
    tech: ["Node.js", "Bootstrap", "PostgreSQL"],
    repo: "https://github.com/yanicells/Travel-Tracker",
    demo: "https://drive.google.com/file/d/1pqytL2KhTOcpOAdIYb-RZQhJROimU8p3/view",
    image: "/projects/travel.png",
    category: "webdev",
    isFeatured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
