import { Camera } from "lucide-react";

const gear = [
  {
    type: "Body",
    mobileItem: "Canon EOS R50",
    desktopItem: "Canon EOS R50",
  },
  {
    type: "Prime",
    mobileItem: "50mm f/1.8",
    desktopItem: "RF 50mm f/1.8 STM",
  },
  {
    type: "Kit",
    mobileItem: "18-45mm f/4.5-6.3",
    desktopItem: "RF-S 18-45mm f/4.5-6.3 IS STM",
  },
];

export function PhotoGear() {
  return (
    <div className="space-y-4">
      {/* Top divider */}
      <div className="h-px bg-border" />

      {/* Mobile: 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 py-2 md:hidden">
        <div className="flex items-center gap-2">
          <Camera className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">My Gear</span>
        </div>

        {gear.map((g) => (
          <div
            key={`${g.type}-${g.mobileItem}`}
            className="flex items-baseline gap-2"
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground/60">
              {g.type}
            </span>
            <span className="text-sm text-foreground">{g.mobileItem}</span>
          </div>
        ))}
      </div>

      {/* Desktop+: original layout */}
      <div className="hidden py-2 md:flex md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex items-center gap-2">
          <Camera className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">My Gear</span>
        </div>

        {gear.map((g) => (
          <div
            key={`${g.type}-${g.desktopItem}`}
            className="flex items-baseline gap-2"
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground/60">
              {g.type}
            </span>
            <span className="text-sm text-foreground">{g.desktopItem}</span>
          </div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="h-px bg-border" />
    </div>
  );
}
