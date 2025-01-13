import { z } from "zod";

export const personalDetailsFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  image: z.string().url().optional(),
});

export type PersonalDetailsFormSchema = z.infer<
  typeof personalDetailsFormSchema
>;
