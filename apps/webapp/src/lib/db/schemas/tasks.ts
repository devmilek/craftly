import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { organizations } from "./users";

export const taskStatus = ["todo", "in-progress", "completed"] as const;
export const taskStatusEnum = pgEnum("task_status", taskStatus);

export const taskPriority = ["low", "medium", "high"] as const;
export const taskPriorityEnum = pgEnum("task_priority", taskPriority);

export const tasks = pgTable("tasks", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({
    length: 100,
  }).notNull(),
  status: taskStatusEnum("status").notNull(),
  priority: taskPriorityEnum("priority"),
  projectId: uuid()
    .notNull()
    .references(() => projects.id),
  organizationId: varchar()
    .notNull()
    .references(() => organizations.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Task = typeof tasks.$inferSelect;
