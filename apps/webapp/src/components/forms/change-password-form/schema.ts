import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])/, "Password must contain lowercase letters")
      .regex(/^(?=.*[A-Z])/, "Password must contain uppercase letters")
      .regex(/^(?=.*[0-9])/, "Password must contain numbers"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    revokeOtherSessions: z.boolean().default(false),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;
