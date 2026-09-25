import { projects, type Project, type ProjectCategory } from "@/lib/data/projects";
import { photoCollection } from "@/lib/data/photos";
import type { DocumentContent } from "@/components/desktop/window-manager";

export type TagId = "featured" | ProjectCategory;
export type FinderLocation =
  | "desktop"
  | "projects"
  | "photos"
  | "trash"
  | `tag:${TagId}`;
export type FinderView = "icons" | "list";

/** Finder tags double as project filters in the sidebar. */
export const TAGS: { id: TagId; label: string; color: string }[] = [
  { id: "featured", label: "Featured", color: "var(--color-tag-orange)" },
  { id: "webdev", label: "Web", color: "var(--color-tag-blue)" },
  { id: "hackathons", label: "Hackathons", color: "var(--color-tag-purple)" },
  { id: "java", label: "Java", color: "var(--color-tag-green)" },
];

const CATEGORY_KIND: Record<ProjectCategory, string> = {
  webdev: "Web App",
  hackathons: "Hackathon",
  java: "Java",
};

export type ItemIcon =
  | { type: "folder"; glyph?: "photo" }
  | { type: "document"; variant: "text" | "contact" | "pdf"; ext: string }
  | { type: "image"; src: string }
  | { type: "preview"; src: string };

export interface FinderItem {
  id: string;
  name: string;
  kind: string;
  date?: string;
  comment?: string;
  icon: ItemIcon;
  tags?: TagId[];
  /** Words the Finder search field matches against, besides the name. */
  keywords?: string;
  /** A folder to navigate to, or a document to open in its app. */
  target: FinderLocation | DocumentContent;
}

export function locationLabel(location: FinderLocation): string {
  switch (location) {
    case "desktop":
      return "Desktop";
    case "projects":
      return "Projects";
    case "photos":
      return "Photos";
    case "trash":
      return "Trash";
    default:
      return TAGS.find((t) => `tag:${t.id}` === location)?.label ?? "Tag";
  }
}

export function projectTags(project: Project): TagId[] {
  return project.isFeatured ? ["featured", project.category] : [project.category];
}

export const DESKTOP_ITEMS: FinderItem[] = [
  {
    id: "projects",
    name: "Projects",
    kind: "Folder",
    icon: { type: "folder" },
    target: "projects",
  },
  {
    id: "about",
    name: "About Me",
    kind: "Rich Text Document",
    icon: { type: "document", variant: "text", ext: "RTF" },
    target: { kind: "about" },
  },
  {
    id: "experience",
    name: "Experience",
    kind: "Rich Text Document",
    icon: { type: "document", variant: "text", ext: "RTF" },
    target: { kind: "experience" },
  },
  {
    id: "resume",
    name: "Resume",
    kind: "PDF Document",
    icon: { type: "document", variant: "pdf", ext: "PDF" },
    target: { kind: "web", doc: "resume" },
  },
  {
    id: "contact",
    name: "Contact",
    kind: "vCard",
    icon: { type: "document", variant: "contact", ext: "VCF" },
    target: { kind: "contact" },
  },
  {
    id: "photos",
    name: "Photos",
    kind: "Folder",
    icon: { type: "folder", glyph: "photo" },
    target: "photos",
  },
];

const PROJECT_ITEMS: FinderItem[] = projects.map((project) => ({
  id: project.slug,
  name: project.title,
  kind: CATEGORY_KIND[project.category],
  date: project.date,
  comment: project.shortDescription,
  icon: { type: "preview", src: project.image },
  tags: projectTags(project),
  keywords: `${project.tech.join(" ")} ${project.description}`,
  target: { kind: "project", slug: project.slug },
}));

const PHOTO_ITEMS: FinderItem[] = photoCollection.map((photo, index) => ({
  id: photo.src,
  name: photo.alt,
  kind: photo.src.endsWith(".png") ? "PNG image" : "JPEG image",
  icon: { type: "image", src: photo.src },
  target: { kind: "photo", index },
}));

export function itemsAt(location: FinderLocation): FinderItem[] {
  switch (location) {
    case "desktop":
      return DESKTOP_ITEMS;
    case "projects":
      return PROJECT_ITEMS;
    case "photos":
      return PHOTO_ITEMS;
    case "trash":
      return [];
    default: {
      const tag = TAGS.find((t) => `tag:${t.id}` === location)?.id;
      return PROJECT_ITEMS.filter((item) => tag && item.tags?.includes(tag));
    }
  }
}
