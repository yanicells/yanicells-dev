"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProjectsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ProjectsHeader({
  searchQuery,
  onSearchChange,
}: ProjectsHeaderProps) {
  return (
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
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
}
