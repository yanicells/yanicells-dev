import Image from "next/image";
import { type TechItem } from "@/lib/data/tech-stack";

interface TechCardProps {
  tech: TechItem;
  index?: number;
}

export function TechCard({ tech, index }: TechCardProps) {
  const isCertificate = tech.category === "certificates";

  return (
    <div
      className={`group flex gap-4 rounded-lg p-3 transition-colors hover:bg-muted ${
        isCertificate ? "items-start" : "items-center"
      }`}
    >
      {/* Number */}
      {index !== undefined && (
        <span className="w-4 shrink-0 text-sm text-muted-foreground">
          {index}
        </span>
      )}

      {/* Icon */}
      <div className="relative size-10 shrink-0">
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
        <h3 className="font-medium text-foreground">{tech.name}</h3>
        <p
          className={`text-sm text-muted-foreground ${
            isCertificate ? "leading-snug" : "truncate"
          }`}
          style={
            isCertificate
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
              : undefined
          }
        >
          {tech.phrase}
        </p>
      </div>
    </div>
  );
}
