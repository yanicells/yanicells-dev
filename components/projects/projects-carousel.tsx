"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { projects } from "@/lib/data/projects";

const projectImages = projects.map((p) => p.image);

export function ProjectsCarousel() {
  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {projectImages.map((image, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="relative aspect-16/7 overflow-hidden rounded-xl bg-muted">
              <Image
                src={image}
                alt={`Project ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
