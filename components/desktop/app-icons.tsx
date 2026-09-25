import { useId, type ReactNode } from "react";
import type { AppId } from "./window-manager";

/**
 * Dock icons, drawn as simple SVG stand-ins for the system apps. Every app
 * icon sits in the mandatory squircle with a glassy top highlight.
 */
function Squircle({ children }: { children: ReactNode }) {
  return (
    <div className="relative size-full overflow-hidden rounded-[23%] shadow-[0_2px_4px_rgb(0_0_0/0.35)]">
      <svg viewBox="0 0 100 100" className="size-full" aria-hidden>
        {children}
      </svg>
      <div className="pointer-events-none absolute inset-0 rounded-[23%] bg-linear-to-b from-white/25 via-transparent to-transparent shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.35)]" />
    </div>
  );
}

function FinderIcon() {
  const id = useId();
  return (
    <Squircle>
      <defs>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f9fe" />
          <stop offset="1" stopColor="#c4ddf3" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6ac8ff" />
          <stop offset="1" stopColor="#1273e3" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${id}l)`} />
      <path
        d="M0 0H56C52 18 47 32 46 47C45.6 52 48 55 53 55C51.5 67 50 80 53 100H0Z"
        fill={`url(#${id}b)`}
      />
      <rect x="27" y="26" width="6" height="17" rx="3" fill="#0f2a47" />
      <rect x="67" y="26" width="6" height="17" rx="3" fill="#0f2a47" />
      <path
        d="M22 69C38 80 62 80 78 69"
        stroke="#0f2a47"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
    </Squircle>
  );
}

function TextEditIcon() {
  const id = useId();
  return (
    <Squircle>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e4e5ea" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${id})`} />
      {[26, 37, 48, 59, 70].map((y, i) => (
        <rect
          key={y}
          x="18"
          y={y}
          width={i === 4 ? 30 : 56}
          height="4"
          rx="2"
          fill="#b9bdc7"
        />
      ))}
      <path
        d="M82 16L47 58"
        stroke="#2d313a"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path d="M48.8 65.4L40.2 58.2L35.8 72.1Z" fill="#dcb35a" />
    </Squircle>
  );
}

function PreviewIcon() {
  const id = useId();
  return (
    <Squircle>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdfdfe" />
          <stop offset="1" stopColor="#dfe5ee" />
        </linearGradient>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86c9ff" />
          <stop offset="1" stopColor="#3b8de6" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${id}bg)`} />
      <g transform="rotate(-8 44 46)">
        <rect x="16" y="22" width="56" height="44" rx="3" fill="#fff" />
        <rect x="20" y="26" width="48" height="36" rx="1.5" fill={`url(#${id}sky)`} />
        <path d="M20 62V52L32 42L44 52L52 46L68 58V62Z" fill="#48b85c" />
      </g>
      <circle
        cx="63"
        cy="62"
        r="15"
        fill="rgb(255 255 255 / 0.35)"
        stroke="#3a3a3c"
        strokeWidth="6"
      />
      <path
        d="M74 73L86 85"
        stroke="#3a3a3c"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </Squircle>
  );
}

function ContactsIcon() {
  const id = useId();
  return (
    <Squircle>
      <defs>
        <linearGradient id={`${id}p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1ebe1" />
          <stop offset="1" stopColor="#d8ccb9" />
        </linearGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9a7552" />
          <stop offset="1" stopColor="#6c4f35" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${id}p)`} />
      <rect width="20" height="100" fill={`url(#${id}s)`} />
      <circle cx="60" cy="40" r="13" fill="#9b9086" />
      <path d="M36 78C36 61 84 61 84 78V80H36Z" fill="#9b9086" />
    </Squircle>
  );
}

const APP_ICONS: Record<AppId, () => ReactNode> = {
  finder: FinderIcon,
  textedit: TextEditIcon,
  preview: PreviewIcon,
  contacts: ContactsIcon,
};

export function AppIcon({ app }: { app: AppId }) {
  const Icon = APP_ICONS[app];
  return <Icon />;
}

/** The Trash keeps its bin shape instead of a squircle. */
export function TrashIcon() {
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 100"
      className="size-full drop-shadow-[0_2px_3px_rgb(0_0_0/0.35)]"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgb(236 239 243 / 0.9)" />
          <stop offset="1" stopColor="rgb(186 192 201 / 0.9)" />
        </linearGradient>
      </defs>
      <path
        d="M23 30L29.5 89Q30.5 94 35.5 94H64.5Q69.5 94 70.5 89L77 30Z"
        fill={`url(#${id})`}
        stroke="rgb(255 255 255 / 0.6)"
      />
      {[37, 50, 63].map((x, i) => (
        <path
          key={x}
          d={`M${x} 37L${x + (i - 1) * 2} 88`}
          stroke="rgb(110 116 126 / 0.45)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      <ellipse cx="50" cy="30" rx="28" ry="6" fill="#f3f5f7" />
      <ellipse cx="50" cy="30" rx="24.5" ry="3.8" fill="rgb(84 90 100 / 0.55)" />
    </svg>
  );
}
