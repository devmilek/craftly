import { z } from "zod";

import libphonenumber from "google-libphonenumber";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const createContactSchema = z.object({
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
  clientId: z.string().uuid().optional(),
  primary: z.boolean().default(false),
});

export type CreateContactSchema = z.infer<typeof createContactSchema>;
