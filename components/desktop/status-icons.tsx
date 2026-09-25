/** Menu bar glyphs, drawn to sit on the 24px bar like their SF Symbol originals. */

export function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" fill="currentColor" aria-hidden>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

export function BatteryIcon() {
  return (
    <svg viewBox="0 0 27 13" className="h-[12px] w-[25px]" aria-hidden>
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="2" y="2" width="16" height="9" rx="2.4" fill="currentColor" />
      <path d="M25 4.5v4a2.2 2.2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

export function WifiIcon() {
  return (
    <svg viewBox="0 0 20 15" className="h-[13px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden>
      <path d="M2 5.4a11 11 0 0 1 16 0" />
      <path d="M5.1 8.6a6.6 6.6 0 0 1 9.8 0" />
      <circle cx="10" cy="12.4" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SpotlightIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-[14px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="6.8" cy="6.8" r="4.9" />
      <path d="M10.4 10.4L14.5 14.5" />
    </svg>
  );
}

export function ControlCenterIcon() {
  return (
    <svg viewBox="0 0 18 16" className="h-[14px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="1" y="1.2" width="16" height="5.8" rx="2.9" />
      <circle cx="4" cy="4.1" r="1.6" fill="currentColor" stroke="none" />
      <rect x="1" y="9" width="16" height="5.8" rx="2.9" />
      <circle cx="14" cy="11.9" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
