import {
  boolean,
  date,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { clients } from "./clients";
import { organizations } from "./users";
import { relations } from "drizzle-orm";

export const projectStatus = [
  "new",
  "proposal_sent",
  "in_progress",
  "in_review",
] as const;
export const projectStatusEnum = pgEnum("project_status", projectStatus);

export const projects = pgTable("projects", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({
    length: 100,
  }).notNull(),
  description: varchar({
    length: 500,
  }),
  completed: boolean().default(false),
  status: projectStatusEnum("project_status").notNull().default("new"),
  dueDate: date("due_date", {
    mode: "date",
  }),

  clientId: uuid().references(() => clients.id),
  organizationId: varchar()
    .notNull()
    .references(() => organizations.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const projectRelations = relations(projects, ({ one }) => ({
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id],
  }),
}));

export type Project = typeof projects.$inferSelect;
