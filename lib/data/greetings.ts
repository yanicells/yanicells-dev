/**
 * Time-aware greeting messages for the chat interface.
 * Picks a random greeting based on the current hour,
 * with a mix of general and time-specific options.
 */

interface GreetingPool {
  /** Hours range [start, end) in 24h format */
  startHour: number;
  endHour: number;
  messages: string[];
}

/** General greetings — used at any time of day. */
const generalGreetings: string[] = [
  "What's on your mind?",
  "Ask me anything",
  "Let's talk",
  "What can I help with?",
  "Curious about something?",
  "What brings you here?",
  "Go ahead, I'm all ears",
  "What would you like to know?",
  "Hey, what's up?",
  "Got a question for me?",
  "Fire away",
  "Talk to me",
  "What are you working on?",
  "What's the move?",
  "Ask away — I don't bite",
  "I'm here, what's good?",
];

/** Time-specific greeting pools. */
const timeGreetings: GreetingPool[] = [
  {
    // 5 AM – 8 AM: Early morning
    startHour: 5,
    endHour: 8,
    messages: [
      "Up early, I respect that",
      "Morning grind?",
      "Early bird hours",
      "Fresh start, let's go",
      "Rise and build",
      "The early coder catches the bug",
      "Morning — coffee first",
    ],
  },
  {
    // 8 AM – 12 PM: Morning
    startHour: 8,
    endHour: 12,
    messages: [
      "Good morning!",
      "Morning — how are you?",
      "Hey, good morning",
      "Top of the morning to you",
      "Bright and early, nice",
      "Good morning, welcome in",
      "Morning vibes, let's get it",
    ],
  },
  {
    // 12 PM – 2 PM: Noon
    startHour: 12,
    endHour: 14,
    messages: [
      "Lunch break?",
      "Midday check-in",
      "Hey, hope you've eaten",
      "Afternoon — don't skip lunch",
      "Noon thoughts?",
      "Good afternoon, what's up?",
    ],
  },
  {
    // 2 PM – 5 PM: Afternoon
    startHour: 14,
    endHour: 17,
    messages: [
      "Good afternoon",
      "Afternoon productivity?",
      "Hey, how's the day going?",
      "Post-lunch coding session?",
      "Afternoon — let's make it count",
      "Still going strong?",
      "What's the afternoon plan?",
    ],
  },
  {
    // 5 PM – 7 PM: Golden hour
    startHour: 17,
    endHour: 19,
    messages: [
      "Golden hour",
      "Sun's setting, ideas rising",
      "Evening's knocking",
      "Winding down or just warming up?",
      "That golden hour glow",
      "End of day — or just the start?",
    ],
  },
  {
    // 7 PM – 10 PM: Evening
    startHour: 19,
    endHour: 22,
    messages: [
      "Good evening",
      "Evening session, let's go",
      "Hey, good evening",
      "Night owl warming up?",
      "Quiet hours, clear thoughts",
      "Evening — the second shift begins",
      "The fun starts after dark",
    ],
  },
  {
    // 10 PM – 12 AM: Late night
    startHour: 22,
    endHour: 24,
    messages: [
      "Night owl hours",
      "Late night, huh?",
      "Still up? Same",
      "The midnight crew",
      "Best ideas come at night",
      "Burning the midnight oil",
      "Can't sleep? Let's chat",
      "Night mode activated",
    ],
  },
  {
    // 12 AM – 5 AM: After midnight
    startHour: 0,
    endHour: 5,
    messages: [
      "You should be sleeping",
      "Still up? Respect",
      "3 AM thoughts?",
      "The world's asleep, but not us",
      "Late late show",
      "Insomniac club",
      "Moonlight coder",
      "Can't stop, won't stop",
    ],
  },
];

/**
 * Returns a random greeting message appropriate for the current time.
 * ~50% chance of a general greeting, ~50% chance of a time-specific one.
 */
export function getGreeting(): string {
  const hour = new Date().getHours();

  // Find the matching time pool
  const pool = timeGreetings.find(
    (g) => hour >= g.startHour && hour < g.endHour,
  );

  // 50/50: general vs time-specific
  const useTimeSpecific = pool && Math.random() > 0.5;

  if (useTimeSpecific) {
    return pool.messages[Math.floor(Math.random() * pool.messages.length)];
  }

  return generalGreetings[Math.floor(Math.random() * generalGreetings.length)];
}
