"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, Github, ExternalLink } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  projects,
  type Project,
  type ProjectCategory,
} from "@/lib/data/projects";

const projectImages = projects.map((p) => p.image);

const categoryLabels: Record<ProjectCategory, string> = {
  featured: "Featured",
  webdev: "Web Dev",
  java: "Java",
};

function ProjectListItem({ project }: { project: Project }) {
  return (
    <div className="group flex items-center justify-between gap-4 rounded-lg p-3 transition-colors hover:bg-accent/50">
      <div className="flex items-center gap-3">
        {/* Icon/Image */}
        <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        {/* Text content */}
        <div className="min-w-0">
          <h3 className="font-medium text-foreground group-hover:text-primary">
            {project.title}
          </h3>
          <p className="truncate text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
      </div>
      {/* Links */}
      <div className="flex shrink-0 items-center gap-2">
        {project.repo && (
          <Link
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label={`${project.title} GitHub repository`}
          >
            <Github className="size-4" />
          </Link>
        )}
        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label={`${project.title} live demo`}
          >
            <ExternalLink className="size-4" />
          </Link>
        )}
        <ChevronRight className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}

export function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ProjectCategory>("featured");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = project.category === activeTab;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground">
            All the projects I have worked on, from personal to collaborative.
          </p>
        </div>
        {/* Search Box */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Carousel Section */}
      <Carousel
        opts={{
          loop: true,
          align: "start",
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
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                <Image
                  src={image}
                  alt={`Project ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Tabbed Projects Section */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ProjectCategory)}
        className="w-full"
      >
        <TabsList>
          {(Object.keys(categoryLabels) as ProjectCategory[]).map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {categoryLabels[cat]}
            </TabsTrigger>
          ))}
        </TabsList>

        {(Object.keys(categoryLabels) as ProjectCategory[]).map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-4">
            <div className="grid gap-1 sm:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectListItem key={project.title} project={project} />
              ))}
              {filteredProjects.length === 0 && (
                <p className="col-span-full py-8 text-center text-muted-foreground">
                  No projects found matching your search.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
