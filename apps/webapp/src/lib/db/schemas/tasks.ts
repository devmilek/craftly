import {
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { members, organizations, users } from "./users";
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

  dueDate: date("due_date", {
    mode: "date",
  }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const taskRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  assignees: many(taskAssignees),
}));

export type Task = typeof tasks.$inferSelect;
export type TaskInsert = typeof tasks.$inferInsert;

export const taskAssignees = pgTable(
  "task_assignees",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => ({
    unq: unique().on(t.taskId, t.userId), // Unikalna kombinacja taskId i memberId
  })
);

export const taskAssigneesRelations = relations(taskAssignees, ({ one }) => ({
  task: one(tasks, {
    fields: [taskAssignees.taskId],
    references: [tasks.id],
  }),
  member: one(users, {
    fields: [taskAssignees.userId],
    references: [users.id],
  }),
}));

export type TaskAssignee = typeof taskAssignees.$inferSelect;
export type TaskAssigneeInsert = typeof taskAssignees.$inferInsert;

// export type TaskAssignee = typeof taskAssignees.$inferSelect;
