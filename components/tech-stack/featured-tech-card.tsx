import Image from "next/image";
import { type TechItem } from "@/lib/data/tech-stack";

interface FeaturedTechCardProps {
  tech: TechItem;
}

export function FeaturedTechCard({ tech }: FeaturedTechCardProps) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary">
      {/* Icon - larger for featured */}
      <div className="relative size-14 shrink-0">
        <Image
          src={tech.icon}
          alt={tech.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-foreground">{tech.name}</h3>
        <p className="text-sm text-muted-foreground">{tech.phrase}</p>
      </div>
    </div>
  );
}
