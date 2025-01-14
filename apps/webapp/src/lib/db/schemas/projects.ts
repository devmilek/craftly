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
  status: projectStatusEnum("project_status").default("new"),
  dueDate: date("due_date"),

  clientId: uuid().references(() => clients.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Project = typeof projects.$inferSelect;
