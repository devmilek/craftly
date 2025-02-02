import {
  date,
  integer,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { organizations, users } from "./users";
import { projects } from "./projects";
import { tasks } from "./tasks";

export const timeTrackings = pgTable("time_trackings", {
  id: uuid().primaryKey().defaultRandom(),

  userId: varchar("user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  projectId: uuid("project_id").references(() => projects.id, {
    onDelete: "set null",
  }),
  taskId: uuid("task_id").references(() => tasks.id, {
    onDelete: "set null",
  }),

  billableRate: numeric("billable_rate", {
    precision: 10,
    scale: 2,
  }),

  organizationId: varchar("organization_id")
    .notNull()
    .references(() => organizations.id),

  totalSeconds: integer("total_seconds").notNull().default(0),

  date: date("date", {
    mode: "date",
  })
    .notNull()
    .defaultNow(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type TimeTracking = typeof timeTrackings.$inferSelect;
export type TimeTrackingInsert = typeof timeTrackings.$inferInsert;
