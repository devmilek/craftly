import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8),
});
