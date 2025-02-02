import {
  date,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { organizations } from "./users";
import { projects } from "./projects";

export const invoices = pgTable("invoices", {
  id: uuid().primaryKey().defaultRandom(),

  organizationId: text("organization_id")
    .notNull()
    .references(() => organizations.id),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id),

  dueDate: date("due_date", {
    mode: "date",
  }).notNull(),

  amount: numeric("amount", {
    precision: 10,
    scale: 2,
  }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Invoice = typeof invoices.$inferSelect;
