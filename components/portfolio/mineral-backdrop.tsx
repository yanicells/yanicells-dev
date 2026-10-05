import type { CSSProperties } from "react";

// Resting faces of the backdrop. On load they start packed into a small rock
// (solid `core` fill keeps it legible) and drift apart as the rock opens.
const facets = [
  {
    d: "M769 133 1135 58 1500 379 1160 568 900 425Z",
    fill: "url(#stone-face)",
    core: "var(--mineral-stone)",
    coreOpacity: 0.9,
    drift: "6px -34px",
  },
  {
    d: "m1135 58 365 321-285 107-158-219Z",
    fill: "url(#copper-face)",
    core: "var(--mineral-copper)",
    coreOpacity: 0.95,
    drift: "34px -22px",
  },
  {
    d: "m1057 267 158 219-392 381 77-442Z",
    fill: "url(#ruby-face)",
    core: "var(--mineral-ruby)",
    coreOpacity: 0.95,
    drift: "-6px 12px",
  },
  {
    d: "m1215 486 285-107-40 395-637 93Z",
    fill: "url(#copper-face)",
    core: "var(--mineral-copper)",
    coreOpacity: 0.7,
    drift: "28px 30px",
  },
  {
    d: "m900 425 157-158-288-134-161 408 215 326Z",
    fill: "url(#stone-face)",
    opacity: 0.52,
    core: "var(--mineral-stone)",
    coreOpacity: 0.6,
    drift: "-38px 8px",
  },
];

// Abstract mineral planes keep the supplied reference's color and depth.
// The planes open from a small rock once per mount; the resting art is static.
export function MineralBackdrop() {
  return (
    <div className="mineral-backdrop" aria-hidden="true">
      <div className="mineral-light" />
      <div className="mineral-planes">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient
              id="stone-face"
              x1="612"
              y1="180"
              x2="1360"
              y2="785"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--mineral-stone)" stopOpacity="0.02" />
              <stop
                offset="0.55"
                stopColor="var(--mineral-stone)"
                stopOpacity="0.32"
              />
              <stop
                offset="1"
                stopColor="var(--mineral-copper)"
                stopOpacity="0.08"
              />
            </linearGradient>
            <linearGradient
              id="ruby-face"
              x1="1150"
              y1="160"
              x2="724"
              y2="773"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--mineral-ruby)" stopOpacity="0.46" />
              <stop
                offset="0.6"
                stopColor="var(--mineral-ruby)"
                stopOpacity="0.16"
              />
              <stop
                offset="1"
                stopColor="var(--mineral-ruby)"
                stopOpacity="0"
              />
            </linearGradient>
            <linearGradient
              id="copper-face"
              x1="1430"
              y1="390"
              x2="1000"
              y2="770"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--mineral-copper)" stopOpacity="0.36" />
              <stop
                offset="1"
                stopColor="var(--mineral-copper)"
                stopOpacity="0.01"
              />
            </linearGradient>
            <linearGradient
              id="mineral-seam"
              x1="1076"
              y1="205"
              x2="779"
              y2="792"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--mineral-ruby)" stopOpacity="0" />
              <stop
                offset="0.4"
                stopColor="var(--mineral-ruby)"
                stopOpacity="0.45"
              />
              <stop
                offset="1"
                stopColor="var(--mineral-copper)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <g className="mineral-rock">
            {facets.map((facet) => (
              <g
                key={facet.d}
                className="mineral-facet"
                style={{ "--drift": facet.drift } as CSSProperties}
              >
                <path
                  className="mineral-core"
                  d={facet.d}
                  fill={facet.core}
                  style={
                    { "--core-opacity": facet.coreOpacity } as CSSProperties
                  }
                />
                <path d={facet.d} fill={facet.fill} opacity={facet.opacity} />
              </g>
            ))}
            <path
              className="mineral-seam"
              d="m1057 267-157 158-77 442"
              stroke="url(#mineral-seam)"
              strokeWidth="1.25"
            />
            <path
              className="mineral-seam"
              d="m900 425 315 61 285-107"
              stroke="url(#mineral-seam)"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <path className="mineral-glint" d="M1135 58 1500 379" />
          </g>
        </svg>
      </div>
      <div className="mineral-grain" />
    </div>
  );
}
