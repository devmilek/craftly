import { z } from "zod";

import libphonenumber from "google-libphonenumber";
import { ALLOWED_AVATAR_TYPES, MAX_AVATAR_SIZE } from "@/config";
import { formatBytes } from "@/lib/utils";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const createContactSchema = z.object({
  avatar: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_AVATAR_SIZE,
      `Image size must be less than ${formatBytes(MAX_AVATAR_SIZE)}.`
    )
    .refine(
      (file) => ALLOWED_AVATAR_TYPES.includes(file.type),
      `Only the following image types are allowed: ${ALLOWED_AVATAR_TYPES.join(
        ", "
      )}.`
    )
    .optional()
    .nullable(),
  name: z.string().nonempty("Contact name cannot be empty"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) {
          return true;
        }
        try {
          const phoneNumber = phoneUtil.parse(val);
          return phoneUtil.isValidNumber(phoneNumber);
        } catch {
          return false;
        }
      },
      {
        message: "Invalid phone number",
      }
    ),
  position: z.string(),
  clientId: z.string().uuid().optional().nullable(),
  primary: z.boolean().default(false),
});

export type CreateContactSchema = z.infer<typeof createContactSchema>;
