import {
  type TechCategory,
  categoryLabels,
  categoryDescriptions,
  type TechItem,
} from "@/lib/data/tech-stack";
import { TechCard } from "./tech-card";

interface TechSectionProps {
  category: TechCategory;
  items: TechItem[];
}

export function TechSection({ category, items }: TechSectionProps) {
  if (items.length === 0) return null;

  return (
    <section id={category} className="scroll-mt-32">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">
          {categoryLabels[category]}
        </h2>
        <p className="text-sm text-muted-foreground">
          {categoryDescriptions[category]}
        </p>
      </div>

      {/* Full width grid */}
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        {items.map((tech, idx) => (
          <TechCard key={tech.name} tech={tech} index={idx + 1} />
        ))}
      </div>
    </section>
  );
}
