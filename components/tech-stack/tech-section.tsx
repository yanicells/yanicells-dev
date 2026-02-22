import {
  type TechCategory,
  categoryLabels,
  categoryDescriptions,
  type TechItem,
} from "@/lib/data/tech-stack";
import { Button } from "@/components/ui/button";
import { TechCard } from "./tech-card";

interface TechSectionProps {
  category: TechCategory;
  items: TechItem[];
  totalCount?: number;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function TechSection({
  category,
  items,
  totalCount,
  hasMore = false,
  onLoadMore,
}: TechSectionProps) {
  if (items.length === 0) return null;

  const displayedCount = items.length;
  const sectionTotal = totalCount ?? displayedCount;

  return (
    <section id={category} className="scroll-mt-44">
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

      {hasMore && onLoadMore && (
        <div className="mt-3">
          <Button
            variant="outline"
            size="default"
            className="w-full rounded-full"
            onClick={onLoadMore}
          >
            See more
          </Button>
        </div>
      )}
    </section>
  );
}
