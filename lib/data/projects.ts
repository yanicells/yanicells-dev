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
    title: "Eskwelabs Capstone",
    slug: "eskwelabs-capstone",
    description:
      "Two production-ready AI tools built during the Eskwelabs Innovation Fellowship: the Thought Leader Drafter and the Slide Deck Generator.",
    shortDescription:
      "Fellowship projects: Thought Leader Drafter & Slide Generator",
    tech: ["Node.js", "LLMs", "Productization"],
    repo: "https://github.com/yanicells/eskwelabs-capstone",
    live: "https://eskwelabs.yanicells.dev/",
    image: "/projects/eskwelabs.png",
    category: "webdev",
    isFeatured: false,
    date: "Feb - May 2026",
    blog: [
      {
        title: "Why I Joined",
        blocks: [
          {
            type: "text",
            content:
              "I joined Cohort 9 of the Eskwelabs Innovation Fellowship for the AI Solution Development track. I wanted real AI and product experience outside of school. Something that ships, with stakeholders, with users, instead of another class project that lives and dies on a single grade.",
          },
        ],
      },
      {
        title: "Two Problems, Two Tools",
        blocks: [
          {
            type: "text",
            content:
              "The fellowship ran from February to May 2026. Two projects, both AI tools built for actual Eskwelabs internal use. The Thought Leader Drafter helps the CEO write articles in his own voice. The Slide Deck Generator helps Learning Experience Designers build instructor decks faster. Different problems, but both about taking the parts of someone's job that drain hours and seeing how far AI can take them, without producing the kind of generic output AI tools usually spit out.",
          },
        ],
      },
      {
        title: "The Production-Ready Bar",
        blocks: [
          {
            type: "text",
            content:
              "The biggest gap between this and school was the production-ready bar. School projects can be impressive in a demo and fall apart five minutes later. These tools needed to hold up. They needed to handle weird inputs, fail gracefully, and give outputs someone would actually use. None of that is novel as a concept, but actually doing it for the first time is what makes it click.",
          },
        ],
      },
    ],
  },
  {
    title: "Benkyo",
    slug: "benkyo",
    description:
      "A spaced repetition language learning app built with SM-2 algorithm, ease-factor tuning, and cloud sync. Designed for Japanese but works for any language. Offline-capable with conflict resolution and progress tracking.",
    shortDescription: "Spaced repetition language learning app",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    repo: "https://github.com/yanicells/Benkyo",
    live: "https://benkyo.ycells.com",
    image: "/projects/benkyo.png",
    category: "webdev",
    isFeatured: true,
    date: "2026",
    blog: [
      {
        title: "How It Started",
        blocks: [
          {
            type: "text",
            content:
              "Gabe and I were classmates in our Foreign Language class for Japanese. We were both struggling. I randomly messaged him one day asking how he studied for it. He told me he built an app. Which was funny, because I had built one too.",
          },
        ],
      },
      {
        title: "The Collaboration",
        blocks: [
          {
            type: "text",
            content:
              "We compared notes. His approach and mine were different enough that it made sense to merge them. We both had the same problem and we were both too stubborn to just use Anki, so we built our own thing instead. That shared frustration is basically what became Benkyo.",
          },
        ],
      },
      {
        title: "What It Is",
        blocks: [
          {
            type: "text",
            content:
              "Benkyo is a spaced repetition language learning app. It uses an SM-2 algorithm with ease-factor tuning, lapse handling, and due-date scheduling. It works offline, syncs to the cloud with conflict resolution, and tracks your progress over time. We built it for Japanese but it works for anything.",
          },
        ],
      },
      {
        title: "Why It Matters to Us",
        blocks: [
          {
            type: "text",
            content:
              "It started as two people struggling with the same class and making something out of it. That's still what it is. We use it ourselves. I think that's the part I like most about it.",
          },
        ],
      },
    ],
  },
  {
    title: "Instructor Slides Generator",
    slug: "instructor-slides-generator",
    description:
      "An AI-assisted slide generator that enforces non-generic content, frontend/back-end character limits, and resilient speaker notes generation for learning designers.",
    shortDescription: "AI-assisted instructor slide generation",
    tech: ["Node.js", "LLMs", "Prompt Engineering"],
    live: "https://eskwelabs-instructor-slides.vercel.app/",
    image: "/projects/slides-gen.png",
    category: "webdev",
    isFeatured: false,
    date: "2026",
    blog: [
      {
        title: "The Time Problem",
        blocks: [
          {
            type: "text",
            content:
              "Learning Experience Designers were spending 24+ hours building decks for every 16-hour sprint. The v1 prototype already cut that to about 48 minutes, but the content quality was the catch. The decks ran, but they leaned generic, missed speaker notes, and overflowed text boxes regularly.",
          },
        ],
      },
      {
        title: "v1.1: The Three Fixes",
        blocks: [
          {
            type: "text",
            content:
              "My sprint was v1.1. I focused on the AI side. Three pieces. The anti-generic content checker, which forced the model to ask itself 'could this sentence appear in a deck for a completely different topic?' before letting a slide pass. The character limit enforcement, where I mapped backend prompt constraints directly to frontend UI box limits so text never overflowed. And the fail-safe speaker notes generator, with a fallback prompt that ran independently if the main batch failed, written in first-person instructor voice.",
          },
        ],
      },
      {
        title: "The Production Reality",
        blocks: [
          {
            type: "text",
            content:
              "Prompt engineering for production AI is harder than people think. It's not 'write a clever prompt and you're done.' It's writing a prompt, watching it produce something subtly wrong on the 47th run, figuring out which constraint failed, and adding another guardrail. Fluff and hallucination aren't bugs you fix once. They're tendencies you have to keep pushing back against.",
          },
        ],
      },
    ],
  },
  {
    title: "Schrollar",
    slug: "schrollar",
    description:
      "A research discovery platform that feels like social media, running parallel search pipelines with LLM synthesis and NLI-based fact grounding.",
    shortDescription: "Research discovery with LLM synthesis",
    tech: ["Node.js", "LLMs", "NLI", "Search"],
    repo: "https://github.com/CJ-Uy/schrollar",
    live: "https://schrollar.cjuy.dev/",
    demo: "https://drive.google.com/file/d/1byUEwg-Fru-AgKieDlz2bmeEbIneJ10c/view?usp=sharing",
    image: "/projects/schrollar-dev.png",
    category: "webdev",
    isFeatured: true,
    date: "2026",
    blog: [
      {
        title: "How admulto formed",
        blocks: [
          {
            type: "text",
            content:
              "I randomly messaged Niles. We were already working on something together and I wanted to join a hackathon. He was in. We thought of Gabe next, and even with other commitments he said yes. We didn't know who else to ask, so I took a long shot and invited Abby. She was super busy but she said yes too. Then Charles heard we were joining and wanted in. That's how admulto formed.",
          },
        ],
      },
      {
        title: "The Chaos",
        blocks: [
          {
            type: "text",
            content:
              "We did not read the submission specs. One hour before the initial deadline we realized we had to pass a slide deck. Scrambled, got it done, made it to the top 7. And then, because we apparently learn nothing, the exact same thing happened on the final day. Another deadline, another missing slide deck, another hour of panic. Somehow we still podiumed.",
          },
        ],
      },
      {
        title: "The Project",
        blocks: [
          {
            type: "text",
            content:
              "Schrollar was a research discovery platform built to feel more like social media than a library database. We ran a parallel search pipeline across multiple academic sources, ran LLM synthesis on top of it, and grounded every claim through NLI fact-checking. We spent a lot of nights in Aerie. We filmed a video. We had fun with it even when it was stressful, maybe especially when it was stressful.",
          },
        ],
      },
      {
        title: "The Result",
        blocks: [
          {
            type: "text",
            content:
              "2nd Runner Up. We didn't think we'd make it to the top 3. Looking back, I think the chaos actually helped. It kept things loose and we weren't overthinking it. Wouldn't have done it any other way.",
          },
        ],
      },
    ],
  },
  {
    title: "DigiTALINO",
    slug: "digitalino",
    description:
      "A modular governance platform for LGUs featuring e-services, payroll, and disaster risk management with SMS incident mapping.",
    shortDescription: "Modular governance platform for LGUs",
    tech: ["Node.js", "Express", "Postgres", "SMS/Telecom"],
    repo: "https://github.com/yanicells/DigiTALINO",
    live: "https://digitalino.ycells.com/",
    image: "/projects/digitalino.png",
    category: "webdev",
    isFeatured: false,
    date: "2024",
    blog: [
      {
        title: "The Team",
        blocks: [
          {
            type: "text",
            content:
              "Princess invited me. I was the lone 2nd year, everyone else was buried in thesis, and I said yes without really knowing what I was getting into. We called ourselves CSCI_67. We weren't confident about our idea going in, and it showed. We barely made it past eliminations, somewhere near the bottom of the list.",
          },
        ],
      },
      {
        title: "The Turning Point",
        blocks: [
          {
            type: "text",
            content:
              "We got a second chance and made the most of it. The mentorship sessions were genuinely useful and we actually paid attention. We redid the proposal from scratch, not just revised it, actually started over. Somehow we came out seeded 1st in the next round.",
          },
        ],
      },
      {
        title: "The Demo",
        blocks: [
          {
            type: "text",
            content:
              "I suggested we build a prototype. A working one, not just slides. Good thing we did, because during the defense we got commended for showing something real. DigiTALINO was a modular governance platform for LGUs, e-services, payroll, and a disaster risk management system with SMS incident mapping. It was a lot to pull off but having something to click through made the difference.",
          },
        ],
      },
      {
        title: "The Defense",
        blocks: [
          {
            type: "text",
            content:
              "We walked out of the room convinced we bombed it. The Q&A felt rough and we spent the wait replaying everything we said. Then our name got called for Grand Champion. I think none of us fully processed it in the moment.",
          },
        ],
      },
    ],
  },
  {
    title: "TL Drafter",
    slug: "tl-drafter",
    description:
      "An author-focused drafting tool that replicates a CEO's voice by anchoring generation on past writing samples and A/B variant comparisons.",
    shortDescription: "Voice-centered article drafting for executives",
    tech: ["Node.js", "LLMs", "Prompt Engineering"],
    live: "https://esk-tl-drafter-web.vercel.app/",
    demo: "https://drive.google.com/file/d/1xz1TUKlXoN0JQCLbgFUBPlGjRD8nw7Ep/view",
    image: "/projects/tldrafter.png",
    category: "webdev",
    isFeatured: false,
    date: "2026",
    blog: [
      {
        title: "The Voice Problem",
        blocks: [
          {
            type: "text",
            content:
              "Executives spend 4 to 8 hours per article. AI tools and ghostwriters both fail at the same thing: voice. The output sounds smart but generic. The tool I worked on was built to fix that for the Eskwelabs CEO, using his past writing as the anchor.",
          },
        ],
      },
      {
        title: "Phase 2: The Three Pieces",
        blocks: [
          {
            type: "text",
            content:
              "I inherited a Phase 1 MVP and owned Phase 2. Three pieces. The writing samples library, where users upload PDFs of past articles and the system extracts text and ties them to a writing session. The A/B comparison mode, which generates two variants side-by-side using a single LLM call with delimited output to keep cost and latency down. And the AI pipeline refactor, which made the system stable enough to handle three to five full articles injected into the prompt as style references.",
          },
        ],
      },
      {
        title: "Architectural Bet",
        blocks: [
          {
            type: "text",
            content:
              "We skipped RAG and embeddings entirely. The bet was that voice replication isn't really a retrieval problem. It's about giving the model enough connected, in-context style data to pattern-match the rhythm and word choice. Modern context windows are big enough that this works. The A/B mode made the difference visible. Variants with samples sounded like the author. Variants without sounded like AI.",
          },
        ],
      },
    ],
  },
  {
    title: "UniSort",
    slug: "unisort",
    description:
      "A university matching platform featuring a weighted multi-dimensional scoring algorithm, research-backed quizzes, and an anonymous Freedom Wall with real-time analytics.",
    shortDescription: "Quiz-based university matching",
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
    shortDescription: "Pokémon-themed quiz sorting",
    tech: ["Node.js", "PostgreSQL", "TailwindCSS"],
    live: "https://family.misa.org.ph",
    image: "/projects/misayang.png",
    category: "webdev",
    isFeatured: false,
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
    title: "Yanicells",
    slug: "portfolio-website",
    description:
      "A personal portfolio built with a ChatGPT-inspired UI, featuring an AI chatbot powered by Gemini, Spotify stats, an anime watchlist, photography gallery, and saved conversations.",
    shortDescription: "Personal Portfolio Website",
    tech: ["Next.js", "Gemini API", "TypeScript"],
    live: "https://yanicells.dev",
    repo: "https://github.com/yanicells/yanicells-dev",
    image: "/projects/yani-portfolio.png",
    category: "webdev",
    isFeatured: false,
    date: "Jan - Feb 2026",
    blog: [
      {
        title: "The Inspiration",
        blocks: [
          {
            type: "text",
            content:
              "Picking a design for a portfolio is genuinely one of the hardest parts. So many portfolios online start blending together after a while. The hero section, the about me, the projects grid, done. I knew I wanted something different but kept hitting a wall with inspiration. Then it clicked: the UI I spend the most time in isn't any portfolio, it's AI chatbots. ChatGPT, Claude, Perplexity. I'm in these constantly. So I just used that as my starting point and ran with it.",
          },
        ],
      },
      {
        title: "How It Came Together",
        blocks: [
          {
            type: "text",
            content:
              "I went through each chatbot I actually use and pulled what I liked from each. The projects page is a mix of Claude's artifacts panel and ChatGPT's apps UI. The tech stack page took inspo from the GPT explore section. The discovery page is basically my take on Perplexity's discover feed. It wasn't about copying any one thing, more like assembling a UI I already felt comfortable in and making it mine. Once I had that direction, everything else kind of fell into place.",
          },
        ],
      },
      {
        title: "The Chatbot and the Saved Chats",
        blocks: [
          {
            type: "text",
            content:
              "Adding a Gemini-powered chatbot was always part of the plan. I thought it would be a fun way to let people interact with the site. The fun part was tuning the prompt so it actually sounds like me and not just a generic assistant. I had to put guardrails in so it wouldn't go off and say something completely unhinged. The saved chats idea came later though, kind of randomly. I thought, if this is inspired by AI chat UIs, what if I actually used conversations as a form of blog posts? That realization pushed me to lean even harder into the whole concept.",
          },
        ],
      },
      {
        title: "The Personal Stuff",
        blocks: [
          {
            type: "text",
            content:
              "I think I took the word 'personal' in personal portfolio a little too literally, and I love that. You can see my Spotify stats (around 180k+ minutes in 2025, and yes, as my mental health gets worse, my listening minutes go up and my music taste gets better), browse my anime watchlist, and check out my photography. None of that was planned from the start. I just kept adding things as I went. The site kind of reflects how my brain works: one tab at a time, no strict structure, just whatever felt right.",
          },
        ],
      },
      {
        title: "What I'm Most Proud Of",
        blocks: [
          {
            type: "text",
            content:
              "More than anything, I'm proud that this site actually feels like me. Not just a showcase of projects and skills, but a real window into what I'm into, what I'm listening to, what I'm watching, and how I think. Most portfolios tell you what someone can build. This one just lets you get to know me. And honestly, who knows, there might be even more tabs in the future.",
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
    shortDescription: "Personal blog and anonymous notes",
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
