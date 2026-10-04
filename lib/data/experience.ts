interface Experience {
  organization: string;
  title: string;
  date: string;
  summary: string;
  description: string;
  homepage: boolean;
  previousRole?: string;
}

// Dates and roles reflect the October 2026 career update.
export const experiences: Experience[] = [
  {
    organization: "Diffusr",
    title: "AI and Software Engineering Intern",
    date: "Jun 2026–present",
    summary: "Software and AI workflows for video production and campaign operations.",
    description:
      "Work on the software around the team’s AI video-production pipeline, from desktop tools to media processing and operational reliability. My role involves making complex runs easier to review, manage, and recover, alongside contributions to the team’s advertising-management application.",
    homepage: true,
  },
  {
    organization: "Ateneo MISA",
    title: "Assistant Vice President for IT Skills and Development",
    date: "Aug 2026–present",
    summary: "Lead 15+ developers across organization and client projects, workshops, and mentorship.",
    description:
      "Lead a team of 15+ developers working on software, AI, data, and automation projects inside and outside Ateneo. I oversee project intake and delivery, coordinate with clients, and support developers through workshops and mentorship. Our Python workshop welcomed 30+ attendees.",
    homepage: true,
    previousRole: "IT Skills and Development Officer, Aug 2025–Jul 2026",
  },
  {
    organization: "Maui Cart by Pasifika Hub",
    title: "Freelance Software Engineer",
    date: "Jun 2026–present",
    summary: "Share product and engineering ownership with one other developer on a commerce platform.",
    description:
      "Work with one other developer on a shopping and operations platform for Pasifika Hub’s customers in American Samoa. We share responsibility for product decisions, development, and delivery, bringing customer shopping and staff/vendor operations into one application. The platform is still in development.",
    homepage: true,
  },
  {
    organization: "JWay Group",
    title: "AI Engineering Intern, AI Strategy and Automation",
    date: "May 2026–present",
    summary: "AI product engineering for personal stories, memories, and evidence-based answers.",
    description:
      "Work on Eternal Love Connection, a product for recording personal stories and preserving memories. My role spans product planning and full-stack AI engineering, with an emphasis on guided capture, human review, and answers grounded in a person’s source material. The current application extends the original n8n prototype with voice and photo/video stories.",
    homepage: false,
  },
  {
    organization: "Timoga Holiday Resort",
    title: "Freelance Software Engineer",
    date: "Dec 2025–Jun 2026",
    summary: "Point-of-sale, reservations, and payroll management software.",
    description:
      "Owned development of an internal operations system for a local resort in Iligan City. The work centered on translating entrance, cottage-booking, daily-closeout, and payroll routines into software that preserves historical prices and operational records.",
    homepage: false,
  },
];

export const homepageExperiences = experiences.filter(({ homepage }) => homepage);
