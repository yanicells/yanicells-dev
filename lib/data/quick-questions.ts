/**
 * Pre-defined quick questions shown in the empty chat state.
 * Clicking one injects both the question and answer as messages
 * without calling the AI API — saving costs and reducing latency.
 */

export interface QuickQuestion {
  /** The question shown as a clickable chip and used as the "user" message */
  question: string;
  /** The pre-written "model" response */
  answer: string;
}

export const quickQuestions: QuickQuestion[] = [
  {
    question: "What are your projects?",
    answer:
      "I've built quite a few! Here are some highlights:\n\n- **UniSort** — a waste classification web app using AI-powered image recognition, built with Next.js and TensorFlow\n- **Timoga** — a holiday resort management system for tracking employees, payroll, and bookings\n- **Food Stub System** — an event food stub distribution app for Ateneo, handling signups, claiming, and admin management\n- **This portfolio** — yanicells.dev, built with Next.js 15, TypeScript, and a Gemini-powered chatbot (that's me!)\n\nYou can check out all my projects on the [Projects](/projects) page! 🚀",
  },
  {
    question: "Tell me about yourself",
    answer:
      "Hey! I'm **Edrian Miguel E. Capistrano**, but most people know me as **Yanicells** online.\n\nI'm a **Computer Science student at Ateneo de Manila University** and a **full-stack web developer**. I love building things for the web — from slick frontends to robust backends.\n\nMy go-to stack is **Next.js + TypeScript + Tailwind CSS + PostgreSQL**, but I also work with Java, Python, and whatever gets the job done.\n\nWhen I'm not coding, I'm probably playing badminton, listening to music, or scrolling through tech Twitter. Feel free to check out my [About](/about) page for more!",
  },
  {
    question: "What's your tech stack?",
    answer:
      "Here's what I work with daily:\n\n**Frontend:**\n- Next.js & React with TypeScript\n- Tailwind CSS + shadcn/ui\n- Lucide Icons\n\n**Backend:**\n- Node.js\n- Drizzle ORM + PostgreSQL (Neon)\n- Clerk for authentication\n\n**Tools & Infra:**\n- Vercel for deployments\n- pnpm as package manager\n- Git + GitHub\n- VS Code\n\nCheck out the full breakdown on my [Tech Stack](/tech-stack) page!",
  },
  {
    question: "How can I contact you?",
    answer:
      "You can reach me through any of these:\n\n- **Email** — edrian.capistrano@gmail.com\n- **GitHub** — [github.com/yanicells](https://github.com/yanicells)\n- **LinkedIn** — [linkedin.com/in/yanicells](https://www.linkedin.com/in/yanicells)\n- **Instagram** — [@yahneyy](https://www.instagram.com/yahneyy)\n\nOr just head over to my [Contact](/contact) page. I'm always happy to chat! ✌️",
  },
];
