import { taskPriority, taskStatus } from "@/lib/db/schemas";
import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
  projectId: z.string().nullable(),
  assigneesId: z.string().array().optional(),
  dueDate: z.date().nullable(),
  status: z.enum(taskStatus).default("todo"),
  priority: z.enum(taskPriority).nullable(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
