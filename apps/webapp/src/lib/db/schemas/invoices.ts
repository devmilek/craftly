import {
  boolean,
  date,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
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

  name: varchar("name"),

  dueDate: date("due_date", {
    mode: "date",
  }).notNull(),

  amount: numeric("amount", {
    precision: 10,
    scale: 2,
  }).notNull(),

  paid: boolean("paid").notNull().default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Invoice = typeof invoices.$inferSelect;
export type InvoiceInsert = typeof invoices.$inferInsert;

export const expenses = pgTable("expenses", {
  id: uuid().primaryKey().defaultRandom(),

  name: varchar("name"),

  amount: numeric("amount", {
    precision: 10,
    scale: 2,
  }).notNull(),

  reimbursable: boolean("reimbursable").notNull(),
  reimbursed: boolean("reimbursed").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Expense = typeof expenses.$inferSelect;
export type ExpenseInsert = typeof expenses.$inferInsert;
