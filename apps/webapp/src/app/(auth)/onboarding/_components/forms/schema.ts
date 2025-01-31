import { z } from "zod";

export const onboardingSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(2).max(255),
  email: z.string().email(),

  //   organization
  logo: z.string().optional(),
  organizationName: z.string().min(2).max(255),
  organizationSlug: z.string().min(2).max(255),
  addSampleData: z.boolean().default(false),
});

export type OnboardingForm = z.infer<typeof onboardingSchema>;
