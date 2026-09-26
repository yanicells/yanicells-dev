"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useNow } from "@/components/desktop/use-now";
import { BatteryIcon, WifiIcon } from "@/components/desktop/status-icons";

type Phase = "boot" | "lock" | "leaving";

const BOOT_MS = 1700;
const LEAVE_MS = 650;

/** The lock screen clock: short date over a big 24-hour time in glassy, rounded digits. */
function LockClock() {
  const now = useNow();
  if (!now) return null;
  const date = now
    .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    .replace(",", "");
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  return (
    <div className="absolute inset-x-0 top-[10.5vh] flex flex-col items-center font-rounded">
      <p className="text-[clamp(16px,2.6vh,24px)] font-semibold text-white/80">{date}</p>
      <p className="-mt-[0.5vh] text-[clamp(72px,15vh,150px)] leading-none font-bold tracking-[-0.01em] text-[#e2e2e6]/85 tabular-nums [text-shadow:0_1px_1px_rgb(255_255_255/0.25),0_2px_18px_rgb(0_0_0/0.3)]">
        {time}
      </p>
    </div>
  );
}

/** Input source, battery, and Wi-Fi in the top-right corner, as on the real lock screen. */
function LockStatus() {
  return (
    <div className="absolute top-[7px] right-4 flex items-center gap-3 text-[12px] font-semibold text-white/85" aria-hidden>
      <span>ABC</span>
      <BatteryIcon />
      <WifiIcon />
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
        className="absolute inset-0 cursor-default bg-black bg-[url(/wallpaper.jpg)] bg-cover bg-center transition-transform ease-[cubic-bezier(0.7,0,0.25,1)] outline-none"
        style={{
          transitionDuration: `${LEAVE_MS}ms`,
          transform: phase === "leaving" ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <LockStatus />
        {phase !== "boot" && <LockClock />}
        <div className="absolute inset-x-0 bottom-[9vh] flex flex-col items-center [text-shadow:0_1px_6px_rgb(0_0_0/0.4)]">
          <Image
            src="/avatar.jpg"
            alt=""
            width={40}
            height={40}
            loading="eager"
            className="size-10 rounded-full object-cover shadow-[0_0_0_0.5px_rgb(255_255_255/0.3),0_2px_10px_rgb(0_0_0/0.4)]"
          />
          <p className="mt-2 text-[13px] font-semibold text-white">Edrian Miguel E. Capistrano</p>
          <p className="mt-1 text-[11px] text-white/65">
            <span className="pointer-coarse:hidden">Press Space to enter</span>
            <span className="hidden pointer-coarse:inline">Tap to enter</span>
          </p>
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
