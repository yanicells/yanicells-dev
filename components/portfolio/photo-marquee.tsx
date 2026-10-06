import Image from "next/image";

interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * An auto-scrolling row of photos. The list renders twice so the CSS loop
 * can slide by half its width and restart seamlessly; the copy is hidden
 * from assistive tech and keyboard focus.
 */
export function PhotoMarquee({ photos }: { photos: Photo[] }) {
  return (
    <div className="photo-marquee" role="region" aria-label="Photography">
      <div className="photo-marquee-track">
        {[false, true].map((copy) => (
          <ul key={String(copy)} aria-hidden={copy || undefined}>
            {photos.map((photo) => (
              <li key={photo.src}>
                <a
                  href={photo.src}
                  tabIndex={copy ? -1 : undefined}
                  aria-label={`Open photo: ${photo.alt}`}
                >
                  <Image
                    src={photo.src}
                    alt={copy ? "" : photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 540px) 70vw, 300px"
                  />
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
