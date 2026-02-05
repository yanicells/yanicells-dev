"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TechStackSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function TechStackSearch({
  searchQuery,
  onSearchChange,
}: TechStackSearchProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search technologies"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
