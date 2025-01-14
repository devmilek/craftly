import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({
    length: 100,
  }).notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Client = typeof clients.$inferSelect;
