/**
 * Hardcoded chat conversations displayed in the "Chats" section.
 * Each chat is a read-only conversation thread with a title and slug.
 */

export interface ChatConversation {
  slug: string;
  title: string;
  messages: ChatEntry[];
}

export interface ChatEntry {
  role: "user" | "model";
  content: string;
}

export const chats: ChatConversation[] = [
  {
    slug: "tech-stack-rundown",
    title: "Tech stack rundown",
    messages: [
      {
        role: "user",
        content: "What's your go-to tech stack?",
      },
      {
        role: "model",
        content:
          "My primary stack revolves around **Next.js** with **TypeScript** — it's my bread and butter for full-stack web dev.\n\nFor styling I use **Tailwind CSS** with **shadcn/ui** components built on top of **Base UI** primitives. It keeps things clean and accessible without a ton of custom CSS.\n\nOn the backend side, I reach for **Drizzle ORM** with **PostgreSQL** (usually hosted on **Neon**). For auth, **Clerk** has been my go-to lately.\n\nDeployments go straight to **Vercel** — the DX is unmatched for Next.js projects.",
      },
      {
        role: "user",
        content: "Why Next.js over something like plain React or Remix?",
      },
      {
        role: "model",
        content:
          "A few reasons:\n\n1. **Server Components** — I can fetch data on the server without shipping unnecessary JS to the client. Huge for performance.\n2. **File-based routing** — simple, predictable, and works great with layouts.\n3. **Built-in optimizations** — image optimization, font loading, metadata API — all out of the box.\n4. **Vercel integration** — deploy with a git push and get preview deployments for every PR.\n\nRemix is solid too, but Next.js just fits my workflow better. The ecosystem and community are massive.",
      },
      {
        role: "user",
        content: "Any tools or libraries you can't live without?",
      },
      {
        role: "model",
        content:
          "Oh definitely:\n\n- **pnpm** — faster, saves disk space, strict dependency resolution\n- **Lucide Icons** — consistent, lightweight icon set\n- **Zod** — runtime validation that plays perfectly with TypeScript\n- **date-fns** — lightweight date utilities (no moment.js bloat)\n- **react-markdown** — for rendering markdown content like this chat!\n\nAnd honestly, **VS Code** with GitHub Copilot has become an extension of my brain at this point.",
      },
    ],
  },
  {
    slug: "how-this-site-was-built",
    title: "How this site was built",
    messages: [
      {
        role: "user",
        content: "This portfolio looks cool. How'd you build it?",
      },
      {
        role: "model",
        content:
          "Thanks! It's built with **Next.js 15** and **TypeScript** in strict mode. The whole thing is a single-page app with a sidebar layout — inspired by tools like ChatGPT and Linear.\n\nThe chat interface on the home page actually talks to **Google's Gemini API** through a streaming endpoint. So you're getting real-time AI responses, not canned text.\n\nFor the UI, I'm using **shadcn/ui** components styled with **Tailwind CSS**. The sidebar, buttons, skeletons — everything comes from that system.",
      },
      {
        role: "user",
        content: "What about the 'Chats' section? Is that AI too?",
      },
      {
        role: "model",
        content:
          "Nope! The Chats section is actually **completely hardcoded** — it's just a TypeScript file with pre-written conversations. Think of it like a creative FAQ section.\n\nI wanted a way to share some personality and answer common questions without requiring the AI. Plus it loads instantly since there are no API calls.\n\nThe fun part is that it reuses the exact same `ChatMessage` component as the real AI chat, so it looks and feels the same.",
      },
      {
        role: "user",
        content: "That's clever. Any plans to add more features?",
      },
      {
        role: "model",
        content:
          "Always iterating! Some things on my radar:\n\n- **Blog section** — probably using MDX for rich content\n- **Project case studies** — deeper dives into the thinking behind each project\n- **Dark/light theme toggle** — right now it's dark mode only\n- **Analytics dashboard** — might be cool to show real-time visitor stats\n\nBut honestly, the site is mostly a playground for me to try new things and keep my skills sharp. 🚀",
      },
    ],
  },
  {
    slug: "cs-student-life",
    title: "CS student life",
    messages: [
      {
        role: "user",
        content: "You're a CS student at Ateneo right? How's that going?",
      },
      {
        role: "model",
        content:
          "Yep! I'm studying **Computer Science at Ateneo de Manila University**. It's been a wild ride honestly.\n\nThe coursework is heavy — algorithms, data structures, OS, databases, software engineering... the whole nine yards. But I genuinely enjoy it. The problem-solving aspect of CS is what got me hooked in the first place.",
      },
      {
        role: "user",
        content: "How do you balance school and building projects?",
      },
      {
        role: "model",
        content:
          "It's a constant juggling act. Here's what works for me:\n\n1. **Build projects around coursework** — if I need to learn databases, might as well build something real with Drizzle + Postgres.\n2. **Time-box side projects** — I give myself weekends and breaks to go hard on personal stuff.\n3. **Don't chase perfection** — ship it, learn from it, iterate later.\n4. **Stay curious** — the best learning happens when you're genuinely interested in what you're building.\n\nSome semesters are rougher than others, but the portfolio grows regardless. 💪",
      },
      {
        role: "user",
        content: "Any advice for other CS students?",
      },
      {
        role: "model",
        content:
          "A few things I wish someone told me earlier:\n\n- **Build things.** Seriously. Theory is important but nothing beats shipping real projects. Employers care about what you can *do*.\n- **Learn Git properly** — not just `git add . && git commit`. Understand branching, rebasing, and PRs.\n- **Pick a stack and go deep** — it's better to be really good at one thing than mediocre at five.\n- **Network** — go to hackathons, join dev communities, talk to people building cool stuff.\n- **Take breaks** — burnout is real. Your brain needs downtime to actually absorb what you're learning.\n\nAnd most importantly: **have fun with it.** If you're not enjoying the process, something needs to change.",
      },
    ],
  },
];

/** Look up a single chat by its slug. */
export function getChatBySlug(slug: string): ChatConversation | undefined {
  return chats.find((c) => c.slug === slug);
}
