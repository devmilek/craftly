import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { organizations, users } from "./users";

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
  r2Url: text("r2_url").notNull(), // publiczny URL do pliku

  // Metadane
  uploadedBy: varchar("uploaded_by").references(() => users.id, {
    onDelete: "set null",
  }),
  organizationId: varchar("organization_id")
    .references(() => organizations.id, {
      onDelete: "restrict",
    })
    .notNull(),

  // Status i flagi
  isPublic: boolean("is_public").default(true).notNull(),
  status: fileStatusEnum("status").notNull().default("processing"),

  // Opcjonalne metadane
  description: text("description"),
  metadata: jsonb("metadata").default({}), // dowolne dodatkowe metadane

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
