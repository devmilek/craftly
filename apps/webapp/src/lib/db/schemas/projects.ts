import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { clients } from "./clients";

export const projects = pgTable("projects", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({
    length: 100,
  }).notNull(),

  clientId: uuid().references(() => clients.id),
});

export type Project = typeof projects.$inferSelect;
