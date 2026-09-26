import { useId } from "react";
import Image from "next/image";
import type { ItemIcon } from "./finder-data";

/** Blue macOS folder, optionally with an embossed glyph like the Pictures folder. */
function FolderIcon({ glyph }: { glyph?: "photo" }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className="size-full drop-shadow-[0_1px_1.5px_rgb(0_0_0/0.35)]" aria-hidden>
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f92e4" />
          <stop offset="1" stopColor="#1a6cc2" />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#74c4fa" />
          <stop offset="1" stopColor="#3c9cec" />
        </linearGradient>
      </defs>
      <path
        d="M4 16a5 5 0 0 1 5-5h15.6a5 5 0 0 1 3.5 1.45L31 15.5h24a5 5 0 0 1 5 5V51a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"
        fill={`url(#${id}b)`}
      />
      <rect x="4" y="21" width="56" height="35" rx="5" fill={`url(#${id}f)`} />
      <rect x="4.5" y="21.5" width="55" height="1" rx="0.5" fill="rgb(255 255 255 / 0.4)" />
      {glyph === "photo" && (
        <g fill="#2b7ccb" opacity="0.85">
          <path
            d="M24.5 30h15a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5h-15a2.5 2.5 0 0 1-2.5-2.5v-11a2.5 2.5 0 0 1 2.5-2.5zm0 2a.5.5 0 0 0-.5.5v9.3l5-5.3 4 4 3-3 4 4.3v-9.3a.5.5 0 0 0-.5-.5z"
          />
          <circle cx="36.5" cy="35" r="1.8" />
        </g>
      )}
    </svg>
  );
}

/** A page with a folded corner and its type printed at the bottom. */
function DocumentIcon({
  variant,
  ext,
}: {
  variant: "text" | "contact" | "pdf";
  ext: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className="size-full drop-shadow-[0_1px_1.5px_rgb(0_0_0/0.35)]" aria-hidden>
      <path
        d="M16 4h24l12 12v40a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="#fbfbfd"
        stroke="rgb(0 0 0 / 0.12)"
        strokeWidth="0.5"
      />
      <path d="M40 4v8a4 4 0 0 0 4 4h8z" fill="#dcdce2" />
      {variant === "contact" ? (
        <g fill="#a5a5ad">
          <circle cx="32" cy="27" r="6" />
          <path d="M21 44c0-8 22-8 22 0v1H21z" />
        </g>
      ) : (
        <g fill={variant === "pdf" ? "#d0d2d8" : "#c3c6ce"}>
          {[19, 24, 29, 34, 39].map((y, i) => (
            <rect key={y} x="18" y={y} width={i === 0 ? 18 : i === 4 ? 20 : 28} height="2" rx="1" />
          ))}
        </g>
      )}
      <text
        x="32"
        y="54"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fill={variant === "pdf" ? "#e5483f" : "#8e8e93"}
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
      >
        {ext}
      </text>
    </svg>
  );
}

/** Renders a Finder item's icon at any square size set by the parent. */
export function FileIcon({ icon, size }: { icon: ItemIcon; size: number }) {
  switch (icon.type) {
    case "folder":
      return <FolderIcon glyph={icon.glyph} />;
    case "document":
      return <DocumentIcon variant={icon.variant} ext={icon.ext} />;
    case "app":
      return <Image src={icon.src} alt="" width={size} height={size} className="size-full" />;
    case "image":
    case "preview":
      // Finder shows file contents as the icon: letterboxed, with a hairline edge.
      return (
        <div className="flex size-full items-center justify-center">
          <Image
            src={icon.src}
            alt=""
            width={size}
            height={size}
            className="h-auto max-h-full w-auto max-w-full rounded-[3px] object-contain shadow-[0_0_0_0.5px_rgb(255_255_255/0.2),0_1px_3px_rgb(0_0_0/0.5)]"
          />
        </div>
      );
  }
}
