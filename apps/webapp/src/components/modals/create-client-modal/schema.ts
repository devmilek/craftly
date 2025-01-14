import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().nonempty("Project name cannot be empty"),
  description: z.string().optional(),
});
