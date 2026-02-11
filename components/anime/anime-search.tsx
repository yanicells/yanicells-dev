"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AnimeSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function AnimeSearch({ searchQuery, onSearchChange }: AnimeSearchProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search anime..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
