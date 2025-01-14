import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { clients } from "./clients";
import { organizations } from "./users";

export const contacts = pgTable("contacts", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({
    length: 100,
  }).notNull(),
  email: varchar({
    length: 100,
  }),
  phone: varchar({
    length: 100,
  }),
  primary: boolean().notNull().default(false),
  clientId: uuid().references(() => clients.id, {
    onDelete: "cascade",
  }),
  organizationId: varchar()
    .notNull()
    .references(() => organizations.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Contact = typeof contacts.$inferSelect;
