import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { organizations } from "./users";
import { files } from "./files";

export const clients = pgTable("clients", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({
    length: 100,
  }).notNull(),

  organizationId: varchar()
    .notNull()
    .references(() => organizations.id),
  avatarId: uuid().references(() => files.id),

  archived: boolean().notNull().default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Client = typeof clients.$inferSelect;
export type ClientInsert = typeof clients.$inferInsert;
