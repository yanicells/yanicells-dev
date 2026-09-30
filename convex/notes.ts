import { ConvexError, v } from "convex/values";
import { mutation, query, type MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

const MAX_TEXT_LENGTH = 10_000;
const MAX_NOTES_PER_CLIENT = 50;

function checkClientId(clientId: string) {
  if (clientId.length < 16 || clientId.length > 64) throw new ConvexError("Invalid client");
}

function checkText(text: string) {
  if (text.length > MAX_TEXT_LENGTH) throw new ConvexError("Note is too long");
}

/** Loads a note only if it belongs to this visitor. */
async function ownNote(ctx: MutationCtx, id: Id<"notes">, clientId: string) {
  const note = await ctx.db.get(id);
  if (!note || note.clientId !== clientId) throw new ConvexError("Note not found");
  return note;
}

/** A visitor's own notes, most recently edited first. */
export const list = query({
  args: { clientId: v.string() },
  handler: async (ctx, { clientId }) => {
    checkClientId(clientId);
    return ctx.db
      .query("notes")
      .withIndex("by_client", (q) => q.eq("clientId", clientId))
      .order("desc")
      .take(MAX_NOTES_PER_CLIENT);
  },
});

export const create = mutation({
  args: { clientId: v.string(), text: v.string() },
  handler: async (ctx, { clientId, text }) => {
    checkClientId(clientId);
    checkText(text);
    const existing = await ctx.db
      .query("notes")
      .withIndex("by_client", (q) => q.eq("clientId", clientId))
      .take(MAX_NOTES_PER_CLIENT);
    if (existing.length >= MAX_NOTES_PER_CLIENT) throw new ConvexError("Too many notes");
    return ctx.db.insert("notes", { clientId, text, updatedAt: Date.now() });
  },
});

export const update = mutation({
  args: { id: v.id("notes"), clientId: v.string(), text: v.string() },
  handler: async (ctx, { id, clientId, text }) => {
    checkText(text);
    await ownNote(ctx, id, clientId);
    await ctx.db.patch(id, { text, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("notes"), clientId: v.string() },
  handler: async (ctx, { id, clientId }) => {
    await ownNote(ctx, id, clientId);
    await ctx.db.delete(id);
  },
});
