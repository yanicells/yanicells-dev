"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

/** A scrollable strip of film frames. Arrows page through it. */
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
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <a className="photo-frame" href={photo.src} aria-label={`Open photo: ${photo.alt}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 540px) 180px, 220px"
              />
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
                <span>{photo.caption}</span>
              </span>
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
