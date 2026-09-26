"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useNow } from "@/components/desktop/use-now";

type Phase = "boot" | "lock" | "leaving";

const BOOT_MS = 1700;
const LEAVE_MS = 650;

/** The lock screen's big clock: date above, time below, like macOS. */
function LockClock() {
  const now = useNow();
  if (!now) return null;
  const date = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M$/, "");
  return (
    <div className="text-center text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]">
      <p className="text-[clamp(17px,2vw,22px)] font-semibold text-white/85">{date}</p>
      <p className="text-[clamp(84px,11vw,136px)] leading-none font-semibold tracking-[-0.02em] text-white/90 tabular-nums">
        {time}
      </p>
    </div>
  );
}

/**
 * Startup sequence shown over the desktop on every visit: the site logo with
 * a quick progress bar, then a lock screen that slides up on Space, Enter,
 * click, or tap. `onUnlock` fires as the slide starts; `onDone` once it's gone.
 */
export function StartupScreen({ onUnlock, onDone }: { onUnlock: () => void; onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("boot");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("lock"), BOOT_MS);
    return () => clearTimeout(timer);
  }, []);

  const unlock = () => {
    if (phase !== "lock") return;
    setPhase("leaving");
    onUnlock();
    setTimeout(onDone, LEAVE_MS);
  };

  useEffect(() => {
    if (phase !== "lock") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      unlock();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="fixed inset-0 z-[2000] overflow-hidden">
      {/* Lock screen */}
      <button
        type="button"
        onClick={unlock}
        disabled={phase === "boot"}
        aria-label="Unlock"
        className="absolute inset-0 flex cursor-default flex-col items-center justify-between bg-black bg-[url(/wallpaper.png)] bg-cover bg-center pt-[9vh] pb-[11vh] transition-transform ease-[cubic-bezier(0.7,0,0.25,1)] outline-none"
        style={{
          transitionDuration: `${LEAVE_MS}ms`,
          transform: phase === "leaving" ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {phase !== "boot" && <LockClock />}
        <div className="flex flex-col items-center gap-2.5">
          <Image
            src="/avatar.jpg"
            alt=""
            width={60}
            height={60}
            loading="eager"
            className="size-[60px] rounded-full object-cover shadow-[0_0_0_0.5px_rgb(255_255_255/0.3),0_4px_16px_rgb(0_0_0/0.4)]"
          />
          <p className="text-[15px] font-semibold text-white">Yani</p>
          <span className="glass rounded-full px-4 py-1.5 text-[13px] text-white/80">
            <span className="pointer-coarse:hidden">Press Space to enter</span>
            <span className="hidden pointer-coarse:inline">Tap to enter</span>
          </span>
        </div>
      </button>

      {/* Boot screen, fading out to reveal the lock screen */}
      <div
        aria-hidden={phase !== "boot"}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-12 bg-black transition-opacity duration-500 ${
          phase === "boot" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Image src="/boot-logo.png" alt="Yanicells" width={112} height={112} priority className="size-28 object-contain" />
        <div className="h-[5px] w-[168px] overflow-hidden rounded-full bg-white/22" role="progressbar" aria-label="Starting up">
          <div className="h-full w-full origin-left animate-boot-progress rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
