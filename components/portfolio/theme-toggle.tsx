"use client";

import { useSyncExternalStore } from "react";

const storageKey = "portfolio-theme";
const themeEvent = "portfolio-theme-change";

type Theme = "light" | "dark";

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function syncTheme() {
    let preference: string | null = null;
    try {
      preference = localStorage.getItem(storageKey);
    } catch {
      // System appearance still works when browser storage is unavailable.
    }
    document.documentElement.dataset.theme =
      preference === "light" || preference === "dark"
        ? preference
        : media.matches
          ? "dark"
          : "light";
    onChange();
  }

  window.addEventListener(themeEvent, onChange);
  window.addEventListener("storage", syncTheme);
  media.addEventListener("change", syncTheme);

  return () => {
    window.removeEventListener(themeEvent, onChange);
    window.removeEventListener("storage", syncTheme);
    media.removeEventListener("change", syncTheme);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  function toggleTheme() {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The toggle can still change appearance for this visit.
    }
    window.dispatchEvent(new Event(themeEvent));
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Dark mode"
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
      title="Toggle light and dark mode"
    >
      <svg
        className="theme-icon theme-icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M20.2 14.3A8.6 8.6 0 0 1 9.7 3.8a8.6 8.6 0 1 0 10.5 10.5Z" />
      </svg>
      <svg
        className="theme-icon theme-icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
    </button>
  );
}
