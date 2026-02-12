import Image from "next/image";
import Link from "next/link";

interface StorySection {
  title: string;
  content: string[];
}

const storySections: StorySection[] = [
  {
    title: "The Accidental Beginning",
    content: [
      `My first encounter with programming was in Grade 6, where for our TLE class we were learning about Scratch. I vividly remember that for our Performance Task we had to create a simple game. Panic kicked in because for that entire quarter, I really didn't pay attention. All I did in class was roam around the Lab Room, annoying my friends. Honestly, I don't remember how I even survived, but I am pretty sure my friend helped me with my game.`,
      `It was elementary; I still got a high grade, I think. My next encounter with it was the next year, again in our TLE class. This time around it was with HTML and CSS. The only thing I remember here was asking for help from my brother to create my website for the Performance Task (literally just plain HTML and just editing the font and color, it looked so ahh).`,
    ],
  },
  {
    title: "When Things Got Real",
    content: [
      `Then came the actual "programming." Yes, to no one's surprise, it is in our TLE class once again. This time it was C++. I thought learning Java and Python was hard as a 1st Year; imagine teaching C++ to 9th graders during the pandemic, where no one paid attention in class. Looking back, I think this was where I had a hunch that I would enjoy coding and CS (wehh pag sure ba?...). I had fun creating our Performance Tasks (very simple Console GDP calculator), and while it was stressful, I enjoyed it, seeing a bunch of weird syntax come to life.`,
    ],
  },
  {
    title: "Robots & Wires",
    content: [
      `Now, fast forward to Grade 10, we had robotics class. Honestly, that class should have been fun and should have taught me a lot. But my teacher didn't bother teaching anyone anything at all. We did Arduino, where we made a bunch of robots (Line Following, Obstacle Avoidance, Hand/Sensor Following, Bluetooth Control) but I did not learn anything. He just gave us the code and left everything to us. But still, I had fun (10% dahil sa robotics, 90% dahil sa groupmate eme).`,
    ],
  },
  {
    title: "The Present",
    content: [
      `That brings me to the present. I guess I took Computer Science because I thought it would be the most fit for me. Ehh, I guess it's not too bad (my QPI says otherwise). Ateneo is where I actually learned how to code, from learning the basics in Python to more difficult concepts in Java, and I don't even know what's happening in Data Strucs but yeah that. Right now, I'm just working on honing my skills in Web Dev, mainly with Next.js while also working on personal projects. Praying to get a j*b (or get an internship) soon.`,
    ],
  },
];

const highlights: Record<string, string> = {
  "Grade 6": "text-[var(--ctp-blue)]",
  "TLE class": "text-[var(--ctp-teal)]",
  Scratch: "text-[var(--ctp-lavender)]",
  "Performance Task": "text-[var(--ctp-pink)]",
  "Performance Tasks": "text-[var(--ctp-pink)]",
  "Panic kicked in": "italic text-[var(--ctp-red)]",
  "high grade": "text-[var(--ctp-green)]",
  "HTML and CSS": "text-[var(--ctp-yellow)]",
  brother: "text-[var(--ctp-peach)]",
  "C++": "text-[var(--ctp-blue)]",
  Java: "text-[var(--ctp-peach)]",
  Python: "text-[var(--ctp-yellow)]",
  "1st Year": "text-[var(--ctp-lavender)]",
  pandemic: "text-[var(--ctp-red)]",
  "(wehh pag sure ba?...)": "italic text-[var(--ctp-pink)]",
  "Console GDP calculator": "text-[var(--ctp-teal)]",
  "Grade 10": "text-[var(--ctp-blue)]",
  robotics: "text-[var(--ctp-green)]",
  Arduino: "text-[var(--ctp-teal)]",
  "Obstacle Avoidance": "text-[var(--ctp-yellow)]",
  "Bluetooth Control": "text-[var(--ctp-blue)]",
  "Computer Science": "text-[var(--ctp-blue)]",
  "(my QPI says otherwise)": "italic text-[var(--ctp-red-pink)]",
  Ateneo: "text-[var(--ctp-blue)]",
  "Data Strucs": "text-[var(--ctp-lavender)]",
  "Web Dev": "text-[var(--ctp-green)]",
  "Next.js": "text-[var(--ctp-mint)]",
};

function highlightText(text: string): React.ReactNode {
  let result: (string | React.ReactNode)[] = [text];

  Object.entries(highlights).forEach(([phrase, className]) => {
    const newResult: (string | React.ReactNode)[] = [];
    result.forEach((part, i) => {
      if (typeof part !== "string") {
        newResult.push(part);
        return;
      }
      const parts = part.split(phrase);
      parts.forEach((p, j) => {
        if (j > 0) {
          newResult.push(
            <span key={`${phrase}-${i}-${j}`} className={className}>
              {phrase}
            </span>,
          );
        }
        if (p) newResult.push(p);
      });
    });
    result = newResult;
  });

  return result;
}

export function MyStoryContent() {
  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            How I stumbled into programming and somehow ended up here.
          </h1>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border">
        <Image
          src="/yani.png"
          alt="Yanicells — My Story"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      <hr className="border-border" />

      {/* Story Sections */}
      <div className="space-y-10">
        {storySections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
              {section.title}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
              {section.content.map((paragraph, index) => (
                <p key={index}>{highlightText(paragraph)}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="rounded-lg border border-border bg-card/50 p-5">
        <p className="text-sm text-muted-foreground">
          That&apos;s the story so far. Want to see what I&apos;ve been
          building?{" "}
          <Link
            href="/projects"
            className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
          >
            Check out my projects &rarr;
          </Link>
        </p>
      </div>
    </article>
  );
}
