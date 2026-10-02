import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://yanicells.dev", changeFrequency: "monthly", priority: 1 },
    ...["projects", "experience", "about", "contact"].map((page) => ({
      url: `https://yanicells.dev/${page}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map(({ slug }) => ({
      url: `https://yanicells.dev/projects/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
