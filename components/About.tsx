"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            contentRef.current.classList.remove(
              "animate-slide-up",
              "opacity-0"
            );
            // Trigger reflow to restart animation
            void contentRef.current.offsetWidth;
            contentRef.current.classList.add("animate-slide-up");
          } else if (contentRef.current) {
            contentRef.current.classList.remove("animate-slide-up");
            contentRef.current.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto opacity-0 translate-y-8 transition-all duration-700"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-8 font-sans text-center">
          About Me
        </h2>

        {/* Short Preview */}
        <div className="space-y-4 text-[#bac2de] font-sans leading-relaxed">
          <p>
            My first encounter with programming was in{" "}
            <span className="text-[#f5c2e7] font-semibold">Grade 6</span>, where
            for our <span className="text-[#89dceb]">TLE class</span> we were
            learning about <span className="text-[#cba6f7]">Scratch</span>. I
            vividly remember that for our{" "}
            <span className="text-[#89b4fa]">Performance Task</span> we had to
            create a simple game.{" "}
            <span className="text-[#eba0ac] italic">Panic kicked in</span>{" "}
            because for that entire quarter, I really didn&apos;t pay attention.
            All I did in class was roam around the Lab Room, annoying my
            friends. Honestly, I don&apos;t remember how I even survived, but I
            am pretty sure my friend helped me with my game.
          </p>
        </div>

        {/* Collapsible Full Story */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`space-y-4 text-[#bac2de] font-sans leading-relaxed mt-4 pt-4 border-t border-[#45475a] transition-all duration-500 ease-in-out ${
              isExpanded
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            <p>
              It was elementary; I still got a{" "}
              <span className="text-[#a6e3a1]">high grade</span>, I think. My
              next encounter with it was the next year, again in our{" "}
              <span className="text-[#f5c2e7]">TLE class</span>. This time
              around it was with{" "}
              <span className="text-[#fab387]">HTML and CSS</span>. The only
              thing I remember here was asking for help from my{" "}
              <span className="text-[#cba6f7]">brother</span> to create my
              website for the{" "}
              <span className="text-[#89b4fa]">Performance Task</span>{" "}
              (literally just plain HTML and just editing the font and color, it
              looked so ahh).
            </p>
            <p>
              Then came the actual{" "}
              <span className="text-[#f5c2e7]">&quot;programming.&quot;</span>{" "}
              Yes, to no one&apos;s surprise, it is in our TLE class once again.
              This time it was <span className="text-[#89dceb]">C++</span>. I
              thought learning <span className="text-[#f9e2af]">Java</span> and{" "}
              <span className="text-[#a6e3a1]">Python</span> was hard as a{" "}
              <span className="text-[#89b4fa]">1st Year</span>; imagine teaching
              C++ to 9th graders during the{" "}
              <span className="text-[#eba0ac]">pandemic</span>, where no one
              paid attention in class. Looking back, I think this was where I
              had a hunch that I would enjoy coding and CS{" "}
              <span className="text-[#f9e2af] italic">
                (wehh pag sure ba?...)
              </span>
              . I had fun creating our Performance Tasks (very simple{" "}
              <span className="text-[#f38ba8]">Console GDP calculator</span>),
              and while it was stressful, I enjoyed it, seeing a bunch of weird
              syntax come to life.
            </p>
            <p>
              Now, fast forward to{" "}
              <span className="text-[#f5c2e7] font-semibold">Grade 10</span>, we
              had <span className="text-[#f9e2af]">robotics</span> class.
              Honestly, that class should have been fun and should have taught
              me a lot. But my teacher didn&apos;t bother teaching anyone
              anything at all. We did{" "}
              <span className="text-[#94e2d5]">Arduino</span>, where we made a
              bunch of robots (Line Following,{" "}
              <span className="text-[#fab387]">Obstacle Avoidance</span>,
              Hand/Sensor Following,{" "}
              <span className="text-[#a6e3a1]">Bluetooth Control</span>) but I
              did not learn anything. He just gave us the{" "}
              <span className="text-[#cba6f7]">code</span> and left everything
              to us. But still, I had fun (10% dahil sa{" "}
              <span className="text-[#f9e2af]">robotics</span>, 90% dahil sa
              groupmate eme).
            </p>
            <p>
              That brings me to the present. I guess I took{" "}
              <span className="text-[#a6e3a1]">Computer Science</span> because I
              thought it would be the most fit for me. Ehh, I guess it&apos;s
              not too bad{" "}
              <span className="text-[#eba0ac] italic">
                (my QPI says otherwise)
              </span>
              . <span className="text-[#89b4fa]">Ateneo</span> is where I
              actually learned how to code, from learning the basics in Python
              to more difficult concepts in{" "}
              <span className="text-[#f9e2af]">Java</span>, and I don&apos;t
              even know what&apos;s happening in{" "}
              <span className="text-[#cba6f7]">Data Strucs</span> but yeah that.
              Right now, I&apos;m just working on honing my skills in{" "}
              <span className="text-[#a6e3a1]">Web Dev</span>, mainly with{" "}
              <span className="text-[#cba6f7]">Next.js</span> while also working
              on personal projects. Praying to get a j*b (or get an internship)
              soon.
            </p>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="mt-7 mb-6 md:mb-12 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2 bg-[#313244] text-[#cdd6f4] rounded-lg border-2 border-[#45475a] hover:bg-[#45475a] hover:border-[#89b4fa] transition-all duration-300 font-mono text-sm"
          >
            {isExpanded ? "↑ Show Less" : "↓ Read Full Story"}
          </button>
        </div>
      </div>
    </section>
  );
}

// Don't write anything below this line. This is my full About ME.

/*

Hi, I am Yani. I am studying Bachelor of Science in Staying At The Restaurant With Specialization in Being The Man Who Can't Be Moved at Ateneo de Manila University. I struggle with people pleasing, overthinking, and pretending everything is/will be okay. And my coping mechanisms are self-sabotage, detachment, and isolation.

Here's me yapping.

My first encounter with programming was in Grade 6, where for our TLE class we were learning about Scratch. I vividly remember that for our Performance Task we had to create a simple game. Panic kicked in because for that entire quarter, I really didn't pay attention. All I did in class was roam around the Lab Room, annoying my friends. Honestly, I don't remember how I even survived, but I am pretty sure my friend helped me with my game. It was elementary; I still got a high grade, I think. My next encounter with it was the next year, again in our TLE class. This time around it was with HTML and CSS. The only thing I remember here was asking for help from my brother to create my website for the Performance Task (literally just plain HTML and just editing the font and color, it looked so ahh). Then came the actual "programming." Yes, to no one's surprise, it is in our TLE class once again. This time it was C++. I thought learning Java and Python was hard as a 1st Year; imagine teaching C++ to 9th graders during the pandemic, where no one paid attention in class. Looking back, I think this was where I had a hunch that I would enjoy coding and CS (di pa sure...). I had fun creating our Performance Tasks (very simple GDP calculator), and while it was stressful, I enjoyed it, seeing a bunch of weird syntax coming to life. Now, fast forward to 10th grade, we had robotics class. Honestly, that class should have been fun and should have taught me a lot. But my teacher didn't bother teaching anyone anything at all. We did Arduino, where we made a bunch of robots (Line Following, Obstacle Avoidance, Hand/Sensor Following, Bluetooth Control) but I did not learn anything. He just gave us the code and left everything to us. But still, I had fun.

That brings me to the present. I guess I took Computer Science because I thought it would be the most fit for me. Ehh, I guess it's not too bad (my QPI says otherwise). Ateneo is where I actually learned how to code, from learning the basics in Python to more difficult concepts in Java, and I don't even know what's happening in Data Strucs but yeah that. Right now, I'm just working on honing my skills in Web Dev, mainly with Next.js while also working on personal projects. Praying to get employed (or get an internship) soon.

*/
