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
    slug: "cs-student-life",
    title: "CS student at Ateneo",
    messages: [
      {
        role: "user",
        content: "You're studying CS at Ateneo?",
      },
      {
        role: "model",
        content:
          "Yeah, I'm a 2nd year Computer Science student at Ateneo de Manila University. Also doing a dual degree in organizational management because I apparently hate having free time.\n\nIt's honestly a lot. Between coursework, org stuff, side projects, and trying to have an actual life, my schedule is pretty packed. But I'm learning a ton and building things I care about so it's worth it.",
      },
      {
        role: "user",
        content: "How do you balance school and coding projects?",
      },
      {
        role: "model",
        content:
          "Not gonna lie, it's messy. Some weeks I'm super productive, some weeks I'm just trying to survive.\n\nWhat helps: I try to build projects around what I'm learning in class. Studying databases? Build something with Postgres. Learning about APIs? Make a project that uses one. That way I'm learning twice.\n\nAlso I just don't aim for perfection. Ship it, learn from it, fix it later if needed. And I take breaks when I need to. Burnout isn't worth it.",
      },
      {
        role: "user",
        content: "What orgs are you in?",
      },
      {
        role: "model",
        content:
          "I'm a Developer Officer at Computer Society of the Ateneo (CompSat). I help build internal tools, run workshops, stuff like that.\n\nI'm also involved with MISA and show up to GDG events sometimes. Org life is fun but exhausting. There's always something happening, but the people are cool and I've learned a lot just from being around other builders.",
      },
    ],
  },
  {
    slug: "life-outside-code",
    title: "Stuff I do outside coding",
    messages: [
      {
        role: "user",
        content: "Do you do anything besides coding?",
      },
      {
        role: "model",
        content:
          "Yeah, I'd go insane if I only coded.\n\nI'm into photography and videography. I shoot with a Canon R50 and I've been slowly building up my lens collection. I like capturing moments and telling stories visually. Done some event coverage and a short film project.\n\nI also play badminton regularly. It's my main way to stay active and de-stress.",
      },
      {
        role: "user",
        content: "What do you watch or listen to?",
      },
      {
        role: "model",
        content:
          "I watch a lot of anime. Currently keeping up with My Hero Academia. I'm into romcoms too like Oregairu and Fruits Basket.\n\nMusic-wise I'm all over the place on Spotify. Depends on my mood. Sometimes chill stuff while coding, sometimes hype music, sometimes just whatever.\n\nI also watch way too much YouTube. Tech tutorials, photography stuff, random video essays. And yeah, Reddit rabbit holes count.",
      },
      {
        role: "user",
        content: "Where are you based?",
      },
      {
        role: "model",
        content:
          "I'm from Iligan originally but I'm in Quezon City now for school. Still adjusting to the big city life but honestly having fun with it. The commute is a whole different level compared to back home though.\n\nI'm usually around the university area but I explore BGC, Makati, and Ayala sometimes when I want a change of scenery or need decent wifi at a coffee shop.",
      },
    ],
  },
  {
    slug: "how-this-site-works",
    title: "How this portfolio works",
    messages: [
      {
        role: "user",
        content: "How did you build this site?",
      },
      {
        role: "model",
        content:
          "It's a Next.js app with TypeScript and Tailwind CSS. I wanted something different from the usual static portfolio, so I made it ChatGPT-themed.\n\nThe chatbot on the homepage is actually calling Google's Gemini API with a custom prompt that knows about me and my work. So when you ask it questions, you're getting real AI responses tailored to my background.",
      },
      {
        role: "user",
        content: "Wait, so these preset chats are fake?",
      },
      {
        role: "model",
        content:
          "Yeah, these are just hardcoded in a TypeScript file. It's basically a FAQ section that looks like a chat.\n\nThe nice thing is it uses the same chat components as the real AI, so it looks identical. But there's no API call, it just loads instantly. I wanted a way to answer common questions without making people type into the AI every time.",
      },
      {
        role: "user",
        content:
          "Why go with the ChatGPT theme instead of a regular portfolio?",
      },
      {
        role: "model",
        content:
          "I guess I was bored of the typical portfolio layout. Everyone has the same hero section, project cards, contact form setup. It works but it's not memorable.\n\nI wanted something interactive that actually shows how I think and what I care about. Plus the chatbot format lets people ask what they're curious about instead of forcing them to scroll through everything.\n\nAlso I just thought it'd be fun to build. This site is as much a project itself as it is a showcase of my work.",
      },
    ],
  },
];

/** Look up a single chat by its slug. */
export function getChatBySlug(slug: string): ChatConversation | undefined {
  return chats.find((c) => c.slug === slug);
}
