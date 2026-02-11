import {
  pgTable,
  text,
  uuid,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const soilAnalyses = pgTable("soil_analyses", {
  id: uuid("id").primaryKey().defaultRandom(),
  inputHash: text("input_hash").notNull().unique(),
  inputPayload: jsonb("input_payload").notNull(),
  result: jsonb("result").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SoilAnalysis = typeof soilAnalyses.$inferSelect;
export type NewSoilAnalysis = typeof soilAnalyses.$inferInsert;
