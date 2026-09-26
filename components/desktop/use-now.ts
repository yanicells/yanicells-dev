"use client";

import { useEffect, useState } from "react";

/** The current time, refreshed every 10s. `null` until mounted, so SSR never renders a stale clock. */
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 10_000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
