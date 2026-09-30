"use client";

import { useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { TrafficLights } from "@/components/desktop/window-chrome";
import { NotesWindow } from "./notes-window";

const CLIENT_ID_KEY = "yanicells:notes-client";

let client: ConvexReactClient | null = null;

/** One shared Convex client, created on first use so it never runs during SSR. */
function getClient(): ConvexReactClient | null {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;
  client ??= new ConvexReactClient(url);
  return client;
}

/** A random ID kept in this browser, tying visitors to their own notes without an account. */
function getClientId(): string {
  let id = localStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}

/** The Notes app window. Needs `NEXT_PUBLIC_CONVEX_URL`; says so instead of crashing without it. */
export function NotesApp() {
  const [convex] = useState(getClient);
  const [clientId] = useState(getClientId);

  if (!convex) {
    return (
      <div className="flex h-full flex-col bg-window">
        <header data-drag-handle className="flex h-[52px] shrink-0 items-center border-b border-black/70 bg-[#262626] px-4">
          <TrafficLights />
        </header>
        <p className="m-auto text-[13px] text-secondary-label">Notes isn&apos;t available right now.</p>
      </div>
    );
  }

  return (
    <ConvexProvider client={convex}>
      <NotesWindow clientId={clientId} />
    </ConvexProvider>
  );
}
