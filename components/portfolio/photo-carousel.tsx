"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const trackId = useId();
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function move(direction: -1 | 1) {
    const viewport = track.current;
    if (!viewport) return;

    const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
    const next = Math.max(0, Math.min(photos.length - 1, index + direction));
    viewport.scrollTo({
      left: next * viewport.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <div
      className="photo-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photography"
    >
      <div
        id={trackId}
        ref={track}
        className="photo-carousel-track"
        tabIndex={0}
        aria-label="Photos. Use the arrow keys to browse."
        onScroll={(event) => {
          const viewport = event.currentTarget;
          const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
          setCurrent(Math.max(0, Math.min(photos.length - 1, index)));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {photos.map((photo) => (
          <a
            className="photo-slide"
            href={photo.src}
            key={photo.src}
            aria-label={`Open photo: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 540px) calc(100vw - 48px), (max-width: 624px) calc(100vw - 64px), 560px"
            />
          </a>
        ))}
      </div>
      <div className="photo-carousel-controls">
        <button
          type="button"
          aria-label="Previous photo"
          aria-controls={trackId}
          disabled={current === 0}
          onClick={() => move(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          aria-label="Next photo"
          aria-controls={trackId}
          disabled={current === photos.length - 1}
          onClick={() => move(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
