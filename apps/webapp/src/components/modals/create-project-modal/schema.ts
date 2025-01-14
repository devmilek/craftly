import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().nonempty("Project name cannot be empty"),
  description: z.string().optional(),
  clientId: z.string().uuid().optional(),
  dueDate: z.date().optional(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
