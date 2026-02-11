import { Camera } from "lucide-react";

const gear = [
  { item: "Canon EOS R50", type: "Body" },
  { item: "RF 50mm f/1.8 STM", type: "Prime" },
  { item: "RF-S 18-45mm f/4.5-6.3 IS STM", type: "Kit" },
];

export function PhotoGear() {
  return (
    <div className="space-y-4">
      {/* Top divider */}
      <div className="h-px bg-border" />

      {/* Gear content */}
      <div className="flex items-center gap-6 py-2">
        <div className="flex items-center gap-2">
          <Camera className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Gear</span>
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2">
          {gear.map((g, i) => (
            <div key={g.item} className="flex items-center gap-2">
              {i > 0 ? (
                <span className="text-muted-foreground/40">·</span>
              ) : null}
              <div className="flex items-baseline gap-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground/60">
                  {g.type}
                </span>
                <span className="text-sm text-foreground">{g.item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="h-px bg-border" />
    </div>
  );
}
