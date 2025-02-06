import {
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { organizations, users } from "./users";
import { relations } from "drizzle-orm";

export const taskStatus = ["todo", "in_progress", "completed"] as const;
export const taskStatusEnum = pgEnum("task_status", taskStatus);

export const taskPriority = ["low", "medium", "high"] as const;
export const taskPriorityEnum = pgEnum("task_priority", taskPriority);

export const tasks = pgTable("tasks", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({
    length: 100,
  }).notNull(),
  description: text(),
  status: taskStatusEnum("status").notNull().default("todo"),
  priority: taskPriorityEnum("priority"),
  projectId: uuid().references(() => projects.id, {
    onDelete: "cascade",
  }),
  organizationId: varchar()
    .notNull()
    .references(() => organizations.id),
  assigneeId: varchar().references(() => users.id),

  dueDate: date("due_date", {
    mode: "date",
  }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const taskRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
}));

export type Task = typeof tasks.$inferSelect;
export type TaskInsert = typeof tasks.$inferInsert;

export const subtasks = pgTable("subtasks", {
  id: uuid().primaryKey().defaultRandom(),
  taskId: uuid().references(() => tasks.id, {
    onDelete: "cascade",
  }),
  name: varchar({
    length: 100,
  }).notNull(),
  completed: timestamp("completed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Subtask = typeof subtasks.$inferSelect;
export type SubtaskInsert = typeof subtasks.$inferInsert;
