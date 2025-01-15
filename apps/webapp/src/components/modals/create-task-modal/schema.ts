import { taskPriority, taskStatus } from "@/lib/db/schemas";
import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
  projectId: z.string().optional(),
  assigneesId: z.string().array().optional(),
  dueDate: z.date().optional(),
  status: z.enum(taskStatus).default("todo"),
  priority: z.enum(taskPriority).optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
