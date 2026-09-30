import { getProjectBySlug } from "@/lib/data/projects";
import { photoCollection } from "@/lib/data/photos";
import { getWriteupBySlug } from "@/lib/data/writeups";
import {
  locationLabel,
  type FinderLocation,
  type FinderView,
} from "@/components/finder/finder-data";

export type AppId = "finder" | "textedit" | "preview" | "contacts" | "notes";

/** What a window shows. Documents are single-instance; Finder is not. */
export type WindowContent =
  | {
      kind: "finder";
      history: FinderLocation[];
      index: number;
      view: FinderView;
    }
  | { kind: "about" }
  | { kind: "experience" }
  | { kind: "contact" }
  | { kind: "notes" }
  | { kind: "project"; slug: string }
  | { kind: "writeup"; slug: string }
  | { kind: "photo"; index: number }
  | { kind: "web"; doc: "resume" | "cv" };

export type DocumentContent = Exclude<WindowContent, { kind: "finder" }>;

export interface WindowState {
  id: number;
  content: WindowContent;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
  zoomed: boolean;
}

/** `windows` is in stacking order: the last visible one is focused. */
export interface DesktopState {
  windows: WindowState[];
  nextId: number;
}

export type DesktopAction =
  | {
      type: "open";
      content: WindowContent;
      viewport: { w: number; h: number };
    }
  | { type: "close"; id: number }
  | { type: "focus"; id: number }
  | { type: "move"; id: number; x: number; y: number }
  | { type: "minimize"; id: number }
  | { type: "zoom"; id: number }
  | { type: "navigate"; id: number; location: FinderLocation }
  | { type: "history"; id: number; delta: -1 | 1 }
  | { type: "view"; id: number; view: FinderView }
  | { type: "photo"; id: number; index: number }
  | { type: "showApp"; app: AppId }
  | { type: "hideApp"; app: AppId }
  | { type: "quitApp"; app: AppId };

export const MENU_BAR_HEIGHT = 24;
export const DOCK_SPACE = 76;

export const APP_NAMES: Record<AppId, string> = {
  finder: "Finder",
  textedit: "TextEdit",
  preview: "Preview",
  contacts: "Contacts",
  notes: "Notes",
};

export function finderAt(location: FinderLocation): WindowContent {
  return { kind: "finder", history: [location], index: 0, view: "icons" };
}

export function appOf(content: WindowContent): AppId {
  switch (content.kind) {
    case "finder":
      return "finder";
    case "photo":
    case "web":
      return "preview";
    case "contact":
      return "contacts";
    case "notes":
      return "notes";
    default:
      return "textedit";
  }
}

export function titleOf(content: WindowContent): string {
  switch (content.kind) {
    case "finder":
      return locationLabel(content.history[content.index]);
    case "about":
      return "About Me";
    case "experience":
      return "Experience";
    case "contact":
      return "Contact";
    case "notes":
      return "Notes";
    case "project":
      return getProjectBySlug(content.slug)?.title ?? "Untitled";
    case "writeup":
      return getWriteupBySlug(content.slug)?.title ?? "Untitled";
    case "photo":
      return photoCollection[content.index]?.alt ?? "Photo";
    case "web":
      return content.doc === "resume" ? "Resume" : "CV";
  }
}

/** Opening the same document again focuses its window instead of duplicating it. */
function identityOf(content: WindowContent): string {
  switch (content.kind) {
    case "finder":
      return `finder:${content.history[content.index]}`;
    case "project":
      return `project:${content.slug}`;
    case "writeup":
      return `writeup:${content.slug}`;
    case "web":
      return `web:${content.doc}`;
    default:
      return content.kind;
  }
}

const PREFERRED_SIZE: Record<WindowContent["kind"], [number, number]> = {
  finder: [880, 560],
  about: [660, 700],
  experience: [680, 700],
  project: [720, 740],
  writeup: [720, 760],
  contact: [460, 540],
  notes: [880, 580],
  photo: [800, 580],
  web: [860, 900],
};

function initialRect(
  content: WindowContent,
  viewport: { w: number; h: number },
  openCount: number,
) {
  const [pw, ph] = PREFERRED_SIZE[content.kind];
  const available = viewport.h - MENU_BAR_HEIGHT - DOCK_SPACE;
  const w = Math.min(pw, viewport.w - 32);
  const h = Math.min(ph, available - 24);
  const cascade = (openCount % 6) * 26;
  const x = Math.max(16, Math.round((viewport.w - w) / 2) - 60 + cascade);
  const y = MENU_BAR_HEIGHT + Math.max(12, Math.round((available - h) / 3)) + cascade;
  return { x, y: Math.min(y, viewport.h - DOCK_SPACE - h), w, h };
}

function withWindow(
  state: DesktopState,
  id: number,
  update: (win: WindowState) => WindowState,
): DesktopState {
  return {
    ...state,
    windows: state.windows.map((win) => (win.id === id ? update(win) : win)),
  };
}

function bringToFront(state: DesktopState, id: number): DesktopState {
  const win = state.windows.find((w) => w.id === id);
  if (!win) return state;
  return {
    ...state,
    windows: [
      ...state.windows.filter((w) => w.id !== id),
      { ...win, minimized: false },
    ],
  };
}

export function focusedWindow(state: DesktopState): WindowState | undefined {
  return state.windows.findLast((w) => !w.minimized);
}

export function desktopReducer(
  state: DesktopState,
  action: DesktopAction,
): DesktopState {
  switch (action.type) {
    case "open": {
      const identity = identityOf(action.content);
      const existing = state.windows.find(
        (w) => identityOf(w.content) === identity,
      );
      if (existing) {
        const next = withWindow(state, existing.id, (w) => ({
          ...w,
          content: action.content.kind === "finder" ? w.content : action.content,
        }));
        return bringToFront(next, existing.id);
      }
      const visible = state.windows.filter((w) => !w.minimized).length;
      const win: WindowState = {
        id: state.nextId,
        content: action.content,
        ...initialRect(action.content, action.viewport, visible),
        minimized: false,
        zoomed: action.viewport.w < 640,
      };
      return { windows: [...state.windows, win], nextId: state.nextId + 1 };
    }
    case "close":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
      };
    case "focus":
      return bringToFront(state, action.id);
    case "move":
      return withWindow(state, action.id, (w) => ({
        ...w,
        x: action.x,
        y: action.y,
      }));
    case "minimize": {
      const win = state.windows.find((w) => w.id === action.id);
      if (!win) return state;
      // Minimized windows sink to the bottom so focus passes to the next one.
      return {
        ...state,
        windows: [
          { ...win, minimized: true },
          ...state.windows.filter((w) => w.id !== action.id),
        ],
      };
    }
    case "zoom":
      return withWindow(state, action.id, (w) => ({ ...w, zoomed: !w.zoomed }));
    case "navigate":
      return withWindow(state, action.id, (w) => {
        if (w.content.kind !== "finder") return w;
        const { history, index } = w.content;
        if (history[index] === action.location) return w;
        return {
          ...w,
          content: {
            ...w.content,
            history: [...history.slice(0, index + 1), action.location],
            index: index + 1,
          },
        };
      });
    case "history":
      return withWindow(state, action.id, (w) => {
        if (w.content.kind !== "finder") return w;
        const index = w.content.index + action.delta;
        if (index < 0 || index >= w.content.history.length) return w;
        return { ...w, content: { ...w.content, index } };
      });
    case "view":
      return withWindow(state, action.id, (w) =>
        w.content.kind === "finder"
          ? { ...w, content: { ...w.content, view: action.view } }
          : w,
      );
    case "photo":
      return withWindow(state, action.id, (w) =>
        w.content.kind === "photo"
          ? { ...w, content: { kind: "photo", index: action.index } }
          : w,
      );
    case "showApp": {
      const ofApp = state.windows.filter((w) => appOf(w.content) === action.app);
      const others = state.windows.filter((w) => appOf(w.content) !== action.app);
      return {
        ...state,
        windows: [...others, ...ofApp.map((w) => ({ ...w, minimized: false }))],
      };
    }
    case "hideApp":
      return {
        ...state,
        windows: state.windows.map((w) =>
          appOf(w.content) === action.app ? { ...w, minimized: true } : w,
        ),
      };
    case "quitApp":
      return {
        ...state,
        windows: state.windows.filter((w) => appOf(w.content) !== action.app),
      };
  }
}
