"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { projects } from "@/lib/data/projects";

const featuredProjects = projects.filter((p) => p.isFeatured);

export function ProjectsCarousel() {
  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
      }}
      plugins={[
        Autoplay({
          delay: 4500,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {featuredProjects.map((project) => (
          <CarouselItem key={project.slug} className="basis-full">
            <div className="group relative aspect-16/7 overflow-hidden rounded-xl bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient tint overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
              {/* Project info */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 p-4 sm:p-5">
                <h3 className="text-base font-bold text-white sm:text-lg">
                  {project.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-white/70">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
