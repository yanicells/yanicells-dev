import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  /**
   * Notes visitors leave for Yani. `clientId` is a random ID kept in the
   * visitor's browser, so each visitor only sees their own notes; Yani
   * reads all of them from the Convex dashboard.
   */
  notes: defineTable({
    clientId: v.string(),
    text: v.string(),
    updatedAt: v.number(),
  }).index("by_client", ["clientId", "updatedAt"]),
});
