import { z } from "zod";

export const changeEmailSchema = z.object({
  newEmail: z.string().email(),
});

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;
