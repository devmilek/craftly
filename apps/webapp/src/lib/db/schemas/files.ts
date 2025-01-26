import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { organizations, users } from "./users";
import { projects } from "./projects";

export const fileStatus = ["processing", "ready", "error"] as const;
export const fileStatusEnum = pgEnum("file_status", fileStatus);

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Podstawowe informacje o pliku
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(), // rozmiar w bajtach

  // Ścieżki i URL-e
  r2Key: text("r2_key").notNull().unique(), // klucz w R2 storage
  url: text("url").notNull(), // publiczny URL do pliku

  uploadedBy: varchar("uploaded_by").references(() => users.id, {
    onDelete: "set null",
  }),
  organizationId: varchar("organization_id")
    .notNull()
    .references(() => organizations.id, {
      onDelete: "restrict",
    })
    .notNull(),
  projectId: uuid("project_id").references(() => projects.id, {
    onDelete: "restrict",
  }),
  status: fileStatusEnum("status").notNull().default("processing"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const avatars = pgTable("avatars", {
  id: uuid("id").defaultRandom().primaryKey(),

  fileName: text("fileName").notNull(),
  size: integer("size").notNull(),

  r2Key: text("r2_key").notNull().unique(),
  url: text("url").notNull(),

  uploadedBy: varchar("uploaded_by").references(() => users.id, {
    onDelete: "set null",
  }),
  organizationId: varchar("organization_id")
    .notNull()
    .references(() => organizations.id, {
      onDelete: "restrict",
    })
    .notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
