"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function HeaderFrame({
  opening,
  children,
}: {
  opening: boolean;
  children: ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = marker.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span className="header-scroll-marker" ref={marker} aria-hidden="true" />
      <header
        className={`site-header${opening ? " header-opening" : ""}${scrolled ? " is-scrolled" : ""}`}
      >
        <div className="site-shell header-content">{children}</div>
      </header>
    </>
  );
}
