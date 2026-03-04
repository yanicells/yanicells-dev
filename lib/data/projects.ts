export type ProjectCategory = "webdev" | "java";

export type BlogBlockType = "text" | "image" | "code";

export interface BlogTextBlock {
  type: "text";
  content: string;
}

export interface BlogImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogCodeBlock {
  type: "code";
  language?: string;
  content: string;
  caption?: string;
}

export type BlogBlock = BlogTextBlock | BlogImageBlock | BlogCodeBlock;

export interface BlogSection {
  title: string;
  blocks: BlogBlock[];
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  tech: string[];
  repo?: string;
  live?: string;
  demo?: string;
  image: string;
  category: ProjectCategory;
  isFeatured: boolean;
  date?: string;
  blog?: BlogSection[];
}

export const projects: Project[] = [
  {
    title: "UniSort",
    slug: "unisort",
    description:
      "A university matching platform featuring a weighted multi-dimensional scoring algorithm, research-backed quizzes, and an anonymous Freedom Wall with real-time analytics.",
    shortDescription: "Quiz-based university matching platform",
    tech: ["Next.js", "Drizzle", "Neon"],
    repo: "https://github.com/yanicells/UniSort",
    live: "https://unisort.ycells.com",
    image: "/projects/unisort.png",
    category: "webdev",
    isFeatured: true,
    date: "Jan 2026",
    blog: [
      {
        title: "The Idea",
        blocks: [
          {
            type: "text",
            content:
              "So this started as a purely fun December project. I just wanted to practice Next.js and put something out there. My friend Tob mentioned it was a cool idea back in November, and that kind of stuck with me. Then when the sem break came around, I found myself actually building it, not because I had to, but just because I wanted to. The more I worked on it, the more I realized it could actually be something nice, so I started pouring more effort into it.",
          },
          {
            type: "text",
            content:
              "The core idea is pretty simple: you take a quiz and based on your answers you get matched to one of the Big Four (Ateneo, La Salle, UP, UST). The data behind it isn't just made up either. I actually posted on different subreddits and collected real opinions from actual students about their universities, the good and the bad. That made the results feel way more grounded.",
          },
        ],
      },
      {
        title: "How It Grew",
        blocks: [
          {
            type: "text",
            content:
              "I finished the app near the end of December but held off on posting it. When I finally posted in February, the first post on a tech/webdev subreddit got zero traction. Then I posted on the UP subreddit and it just blew up. Within two to three days it had over 5,000 visitors and around 3,000 to 4,000 quiz entries. After that I posted on the other Big Four subreddits and it grew to over 30,000 visitors, 20,000 quiz entries, over 60,000 pageviews within just 2 weeks. Not bad for what started as a random side project.",
          },
        ],
      },
      {
        title: "The Freedom Wall",
        blocks: [
          {
            type: "text",
            content:
              "There's also a Freedom Wall built into the app. I added it partly because I wanted a CRUD feature to practice on, but it ended up being one of the more entertaining parts of the whole thing. Some of the posts on there are genuinely hilarious. It's not the flashiest or most technically impressive project I've built, but it got real people using it, and that means a lot to me.",
          },
        ],
      },
    ],
  },
  {
    title: "MISAyang Samahan",
    slug: "misayang-samahan",
    description:
      "A Pokémon-themed HR platform for MISA with quiz-based sorting, admin tools, and family assignments used by 60+ members.",
    shortDescription: "Pokémon-themed quiz-based sorting",
    tech: ["Node.js", "PostgreSQL", "TailwindCSS"],
    live: "https://family.misa.org.ph",
    image: "/projects/misayang.png",
    category: "webdev",
    isFeatured: true,
    date: "Sep 2025",
    blog: [
      {
        title: "How I Got Here",
        blocks: [
          {
            type: "text",
            content:
              "This was the first project I was deployed on under MISA, the org I joined as IT skills and development officer. The timing was kind of rough since it was only about two to three months after I started learning web dev. I was paired with a third-year dev who already had a lot more experience, and we had a two-week deadline. Safe to say I was nervous going into it.",
          },
        ],
      },
      {
        title: "The Experience",
        blocks: [
          {
            type: "text",
            content:
              "But I just trusted my gut and jumped in. I focused on contributing what I could and collaborated as much as possible with the other dev. This was also where I actually learned how to use GitHub with another person. Before this I was just pushing, pulling, and committing on my own. Doing real collaboration, handling merge conflicts, that was all new. This was the first thing I built that real people actually used, and seeing 60+ members go through it made me really proud.",
          },
        ],
      },
    ],
  },
  {
    title: "Redhead Redemption",
    slug: "redhead-redemption",
    description:
      "A LAN-based multiplayer top-down shooter with custom networking, enemy AI, leveling systems, and hand-drawn pixel art assets.",
    shortDescription: "Multiplayer top-down shooter",
    tech: ["Java", "Sockets", "Multithreading"],
    repo: "https://github.com/yanicells/Redhead-Redemption",
    demo: "https://drive.google.com/file/d/1TRlHSFsdRRIZ71WZ5kfUPuQtJw5qbnDf/view",
    image: "/projects/redemption.png",
    category: "java",
    isFeatured: true,
    date: "Mar - May 2025",
    blog: [
      {
        title: "The Game",
        blocks: [
          {
            type: "text",
            content:
              'Redhead Redemption is our CSCI-22 final project, a top-down LAN multiplayer shooter. The main inspiration was Left 4 Dead 2, a game I used to play a lot with my friends during the pandemic. I really wanted to recreate that "survive and escape with your friends" feeling. I also took a lot of inspiration from RyiSnow, a YouTuber who makes great Java game dev tutorials.',
          },
        ],
      },
      {
        title: "How It Plays",
        blocks: [
          {
            type: "text",
            content:
              "You spawn on an island with zombies everywhere. The goal is to survive and escape. You find keys to unlock the next area while switching between weapons (SMG, shotgun, rifle) and using medkits and traps along the way. You eventually reach a helicopter for your first escape. The second part of the game is a bridge. You fight off more zombies and gather fuel for the helicopter, but you never have quite enough, so you have to go back and find more before you can finally reach the helipad and escape. The zombies also had different abilities, some venomous, some melee only, and the characters had melee attacks too.",
          },
        ],
      },
      {
        title: "The Networking Nightmare",
        blocks: [
          {
            type: "text",
            content:
              "The trickiest part was making the networking actually work. I spent two to three days debugging an issue where the client was sending coordinates to the server just fine, but the server wasn't sending them back correctly, so positions on each client weren't matching up. Turned out it was a simple indexing issue in a for loop. Two to three days of debugging for one line. That hurt.",
          },
        ],
      },
      {
        title: "Playing It for the First Time",
        blocks: [
          {
            type: "text",
            content:
              "The funniest memory from this project is that me and my pair spent months building the game and only actually played it together the day before the deadline. We both just looked at each other like, wait, this is actually really fun. I think that says everything. If you have the chance, try it out. It's genuinely a good time.",
          },
        ],
      },
    ],
  },
  {
    title: "Chika",
    slug: "chika",
    description:
      "A personalized freedom wall app that allows users to post anonymous messages and interact with others' posts.",
    shortDescription: "Anonymous freedom wall for posting messages",
    tech: ["Next.js", "Neon", "PostgreSQL"],
    repo: "https://github.com/yanicells/chika",
    live: "https://chika.yanicells.dev",
    image: "/projects/chikaa.png",
    category: "webdev",
    isFeatured: true,
    date: "Nov 2025",
    blog: [
      {
        title: "The Idea",
        blocks: [
          {
            type: "text",
            content:
              "I built this around October to November and it was my first proper Next.js project. The main inspiration was NGL, that anonymous ask-me-anything app. I thought, why not just build my own version of that? So I did. But then it kind of evolved into something a bit more, like a personal social media or anonymous notes app for me and my friends.",
          },
        ],
      },
      {
        title: "Building It",
        blocks: [
          {
            type: "text",
            content:
              "This was also my first time using Neon and Drizzle for the backend, so there was a lot of learning going on. I added a blog section, and also integrated S3 for image uploads so people could post pictures. My friends actually used it and were posting stuff on there, which made the whole thing feel worth it. It's not a complicated app by any means, but it was the project where I got really comfortable with the full Next.js stack, and that comfort carried over into everything I built after.",
          },
        ],
      },
      {
        title: "Looking Back",
        blocks: [
          {
            type: "text",
            content:
              "Chika holds a special place for me just because of what it represents. It was the first time I actually finished and deployed something that I thought up myself, from idea to live URL. It's not a world-changing app, but seeing friends use it, post on it, and actually interact with it made me realize that building things for real people, even just your friends, hits completely different from building something just to submit it. That feeling is kind of what pushed me to keep going.",
          },
        ],
      },
    ],
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
    date: "Feb - Mar 2025",
    blog: [
      {
        title: "Background",
        blocks: [
          {
            type: "text",
            content:
              "CityCraft was our midterm project for CSCI-20, our Java programming class. The task was to build something using Java GUIs, graphics, multithreading, and OOP. The thing I'm most proud of here is that there are zero images in this project. Everything you see, the roads, clouds, rain, lanterns, mountains, buildings, the characters, all of it is just pure geometry and hardcoded values. No external assets at all.",
          },
        ],
      },
      {
        title: "The Art Direction",
        blocks: [
          {
            type: "text",
            content:
              "The vibe I was going for was a peaceful, Minecraft-inspired scenery. You can control two characters, there are NPCs, and there are random trigger events like rain starting, lanterns lighting up, and fireworks going off. It's a very charming little world for something made entirely out of shapes and colors. I had a lot of fun with this one, and it made me appreciate how much you can do with just code when you commit to it.",
          },
        ],
      },
      {
        title: "Looking Back",
        blocks: [
          {
            type: "text",
            content:
              "This was only our midterm project, not even the final, and yet it's one of the ones I look back on the most fondly. There's something satisfying about making something that looks genuinely alive using nothing but math and code. No assets, no shortcuts, just logic turning into something visual. It reminded me that programming is kind of like art when you let it be.",
          },
        ],
      },
    ],
  },
  {
    title: "IP Locator",
    slug: "ip-locator",
    description:
      "A full-stack IP geolocation app featuring interactive map visualization, JWT-based authentication, and a Node.js/Express RESTful API. It implements search history persistence with Drizzle ORM, batch IP search functionality, and automated environment-based API configuration.",
    shortDescription: "Full-stack IP geolocation app with interactive map",
    tech: ["Node.js", "React", "Express"],
    repo: "https://github.com/yanicells/ip-locator-dashboard",
    live: "https://ip.yanicells.dev/",
    image: "/projects/ip.png",
    category: "webdev",
    isFeatured: false,
    date: "Dec 2025",
    blog: [
      {
        title: "Context",
        blocks: [
          {
            type: "text",
            content:
              "This was built for a dev exam for an internship application. My first ever dev exam. The task was to use an IP geolocation API and build something with it. The rest was up to us.",
          },
        ],
      },
      {
        title: "Building It",
        blocks: [
          {
            type: "text",
            content:
              "I added an interactive map with pins so you could compare multiple IPs visually, a search history feature, and batch IP search so you could look up several at once. By this point I had done a lot of work in Next.js, so coming back to a separate Express backend and React frontend (two separate repos, as the exam required) was a refreshing change of pace. I just treated it like a personal project to keep the pressure off, and I think that helped.",
          },
        ],
      },
      {
        title: "The Outcome",
        blocks: [
          {
            type: "text",
            content:
              "I didn't get the internship, most likely because they needed someone with more flexible working hours than a student can offer. But I genuinely don't regret it. I had fun, I learned a lot, and it's nice to look back at this and see where I was during my very first dev exam.",
          },
        ],
      },
    ],
  },
  {
    title: "Musicells",
    slug: "musicells",
    description:
      "A music discovery app using Spotify's API to browse albums, view new releases, and save favorites.",
    shortDescription: "Music discovery app with Spotify integration",
    tech: ["React", "Zustand", "Spotify API"],
    repo: "https://github.com/yanicells/musicells",
    live: "https://musicells.yanicells.dev",
    image: "/projects/musicells.png",
    category: "webdev",
    isFeatured: false,
    date: "Sep - Oct 2025",
    blog: [
      {
        title: "Background",
        blocks: [
          {
            type: "text",
            content:
              "Musicells was a big milestone for a couple of reasons. It was my first actual deployed web dev project (not counting MISAyang Samahan since that was a team deployment and I wasn't doing the devops myself). It was also my first React project, so this is where I learned components, hooks, state management with Zustand, and deploying to Vercel.",
          },
        ],
      },
      {
        title: "The App",
        blocks: [
          {
            type: "text",
            content:
              "The idea was simple: I love music, Spotify has a great API, why not use it? You can browse albums, see new releases, and save favorites. It was a nice project to tie together everything I was learning at the time. One heads up though: the app doesn't work right now. Spotify only allows one deployed project per developer account, and I'm already using the Spotify API on this personal site. So Musicells got knocked out. But the project still means a lot to me as a first.",
          },
        ],
      },
    ],
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
    date: "Aug - Oct 2025",
    blog: [
      {
        title: "The Course",
        blocks: [
          {
            type: "text",
            content:
              "This was another project from the same online course, focused on working with external APIs. I picked NASA because their APIs are genuinely interesting, and why not? From the name itself, yes, I used the NASA APIs.",
          },
        ],
      },
      {
        title: "The APIs",
        blocks: [
          {
            type: "text",
            content:
              "There are four main features. First is APOD (Astronomy Picture of the Day), where you pick a date and see the photo NASA captured that day. Second is a Mars weather app. Third is rover photos, where you pick a Mars rover and browse the photos it took on Mars. Fourth is the NASA media library, basically a search engine for NASA's image and video collection. That last one was my favorite to build. You search for something and actual NASA content comes up. It feels real in a way that other projects don't. This project was mainly about getting solid with the concept of working with external APIs, and it did exactly that.",
          },
        ],
      },
    ],
  },
  {
    title: "Pixcells",
    slug: "pixcells",
    description:
      "My photography and videography portfolio. Showcasing my work with a clean and responsive design.",
    shortDescription: "Photography and videography portfolio",
    tech: ["Next.js", "React", "TailwindCSS"],
    repo: "https://github.com/yanicells/pixcells",
    live: "https://pixcells.yanicells.dev",
    image: "/projects/pixcells.png",
    category: "webdev",
    isFeatured: false,
    date: "Nov 2025",
    blog: [
      {
        title: "The Site",
        blocks: [
          {
            type: "text",
            content:
              "Pixcells is my personal photography and videography portfolio. It started simply because I wanted somewhere to put my photos and videos, a place that actually felt like mine. I also used this as a chance to practice Shadcn, specifically the carousel components, since I hadn't really used those before. Building it was pretty fun, more of a design challenge than a technical one.",
          },
        ],
      },
      {
        title: "The Reality",
        blocks: [
          {
            type: "text",
            content:
              "Honestly though, I might not keep maintaining this one much longer. This portfolio site already has a photography section now, so Pixcells kind of became redundant. It's a bit sad since I do like how it turned out, but that's just how it goes. At least it gave me a solid reason to get comfortable with Shadcn components and think about how to present visual content nicely on the web.",
          },
        ],
      },
    ],
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
    date: "Aug - Sep 2025",
    blog: [
      {
        title: "The Capstone",
        blocks: [
          {
            type: "text",
            content:
              "Blogcells was the capstone project for my online course. From the name, yes, it's a blog app. You can create posts, leave comments, and like stuff. Pretty simple. But this was a big step for me. It was the first full-stack project I built mostly from scratch, handling both how the frontend looks and how the database is structured.",
          },
        ],
      },
      {
        title: "What I Gained",
        blocks: [
          {
            type: "text",
            content:
              "As basic as it sounds, finishing this felt really good. Before this, everything I built was either guided or just frontend stuff. This was the first time I sat down and thought through how users, posts, comments, and likes should all connect in a database. That kind of thinking, actually designing a schema and having it work end to end, was new for me. A lot of what I learned here carried into everything I built after.",
          },
        ],
      },
    ],
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
    date: "Aug 2025",
    blog: [
      {
        title: "The Project",
        blocks: [
          {
            type: "text",
            content:
              "Travel Tracker was a mini project from the online course I took. The main draw for me was the visual: you enter the ISO codes of countries you've visited and they light up on a map. It's cool. This is where I first got hands-on with Postgres and really started getting comfortable with Express. A lot of it was guided with boilerplate already provided, but I still had fun going through it. And honestly, the map makes it look way cooler than it actually is.",
          },
        ],
      },
      {
        title: "Why It Mattered",
        blocks: [
          {
            type: "text",
            content:
              "It sounds small, but this was one of the projects that got me genuinely excited to keep going. Something about seeing data you put in actually show up visually on a map just hits different. It made databases feel less abstract and more real. Small project, but it did its job.",
          },
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
