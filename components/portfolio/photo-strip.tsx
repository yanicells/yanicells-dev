"use client";

import Image from "next/image";
import { useId, useRef, useState, type CSSProperties } from "react";

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Resting angle in degrees, so each print hangs a little crooked. */
  tilt: number;
}

/** A single scrollable row of photo prints clipped to a line. Arrows page through it. */
export function PhotoStrip({ photos }: { photos: Photo[] }) {
  const trackId = useId();
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  function updateEdges() {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }

  function page(direction: -1 | 1) {
    const el = track.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <div className="photo-strip" role="region" aria-label="Photography">
      <ul id={trackId} ref={track} className="photo-strip-track" onScroll={updateEdges}>
        {photos.map((photo) => (
          <li key={photo.src} style={{ "--tilt": `${photo.tilt}deg` } as CSSProperties}>
            <a className="photo-print" href={photo.src} aria-label={`Open photo: ${photo.alt}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 540px) 200px, 240px"
              />
              <span aria-hidden="true">{photo.caption}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="photo-strip-controls">
        <button
          type="button"
          aria-label="Previous photos"
          aria-controls={trackId}
          disabled={edges.start}
          onClick={() => page(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          aria-label="Next photos"
          aria-controls={trackId}
          disabled={edges.end}
          onClick={() => page(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
