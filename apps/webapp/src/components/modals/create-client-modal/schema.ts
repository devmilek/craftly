import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().nonempty("Project name cannot be empty"),
});

export type CreateClientSchema = z.infer<typeof createClientSchema>;
