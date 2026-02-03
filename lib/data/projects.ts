export interface Project {
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: "Redhead Redemption",
    description:
      "A LAN-based multiplayer top-down shooter with custom networking, enemy AI, leveling systems, and hand-drawn pixel art assets.",
    tech: ["Java", "Sockets", "Multithreading"],
    repo: "https://github.com/yanicells/Redhead-Redemption",
    demo: "https://drive.google.com/file/d/1TRlHSFsdRRIZ71WZ5kfUPuQtJw5qbnDf/view",
    image: "/projects/redemption.png",
  },
  {
    title: "UniSort",
    description:
      "A university matching platform featuring a weighted multi-dimensional scoring algorithm, research-backed quizzes, and an anonymous Freedom Wall with real-time analytics.",
    tech: ["Next.js", "Drizzle", "Neon"],
    repo: "https://github.com/yanicells/UniSort",
    demo: "https://unisort.ycells.com",
    image: "/projects/unisort.png",
  },
  {
    title: "MISAyang Samahan",
    description:
      "A Pokémon-themed HR platform for MISA with quiz-based sorting, admin tools, and family assignments used by 60+ members.",
    tech: ["Node.js", "PostgreSQL", "TailwindCSS"],
    demo: "https://family.misa.org.ph",
    image: "/projects/misayang.png",
  },
  {
    title: "Chika",
    description:
      "A personalized freedom wall app that allows users to post anonymous messages and interact with others' posts.",
    tech: ["Next.js", "Neon", "PostgreSQL"],
    repo: "https://github.com/yanicells/chika",
    demo: "https://chika.yanicells.dev",
    image: "/projects/chika.png",
  },
  {
    title: "CityCraft",
    description:
      "An interactive 2D animated cityscape with dual-player control, dynamic weather, fireworks, and environmental sound effects.",
    tech: ["Java", "Swing", "Multithreading"],
    repo: "https://github.com/yanicells/CityCraft",
    image: "/projects/citycraft.png",
  },
  {
    title: "Musicells",
    description:
      "A music discovery app using Spotify's API to browse albums, view new releases, and save favorites.",
    tech: ["React", "Zustand", "Spotify API"],
    repo: "https://github.com/yanicells/musicells",
    demo: "https://musicells.yanicells.dev",
    image: "/projects/musicells.png",
  },
  {
    title: "NASA APIs Explorer",
    description:
      "A web app that integrates multiple NASA APIs to display astronomy images, media libraries, and Mars rover data.",
    tech: ["Node.js", "TailwindCSS", "REST APIs"],
    repo: "https://github.com/yanicells/NASA-APIs",
    demo: "https://drive.google.com/file/d/1n3MuIYU4EHJ0Kgk4n10nx89EVc9-OFR8/view",
    image: "/projects/nasa.png",
  },
  {
    title: "Pixcells",
    description:
      "My photography and videography portfolio. Showcasing my work with a clean and responsive design.",
    tech: ["Next.js", "React", "TailwindCSS"],
    repo: "https://github.com/yanicells/pixcells",
    demo: "https://pixcells.yanicells.dev",
    image: "/projects/pixcells.png",
  },
  {
    title: "Blogcells",
    description:
      "A blogging platform where users can create posts, leave comments, and like content with a clean interface.",
    tech: ["Node.js", "TailwindCSS", "PostgreSQL"],
    repo: "https://github.com/yanicells/Blogcells",
    demo: "https://drive.google.com/file/d/1RS3xFCqgAiJHtbu3laanLfSTznuTugma/view",
    image: "/projects/blogcells.png",
  },
  {
    title: "Travel-Tracker",
    description:
      "Track and visualize countries you've visited using ISO codes, with user profiles and country management features.",
    tech: ["Node.js", "Bootstrap", "PostgreSQL"],
    repo: "https://github.com/yanicells/Travel-Tracker",
    demo: "https://drive.google.com/file/d/1pqytL2KhTOcpOAdIYb-RZQhJROimU8p3/view",
    image: "/projects/travel.png",
  },
];
