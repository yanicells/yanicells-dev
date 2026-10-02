"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function HeaderFrame({
  opening,
  children,
}: {
  opening: boolean;
  children: ReactNode;
}) {
  const [compact, setCompact] = useState(false);
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = marker.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setCompact(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`header-slot${opening ? " header-slot-opening" : ""}`}>
      <header className={`site-header${compact ? " is-compact" : ""}`}>
        {children}
      </header>
      <span className="header-scroll-marker" ref={marker} aria-hidden="true" />
    </div>
  );
}
