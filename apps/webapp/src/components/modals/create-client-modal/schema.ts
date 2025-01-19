import { ALLOWED_AVATAR_TYPES, MAX_AVATAR_SIZE } from "@/config";
import { formatBytes } from "@/lib/utils";
import { z } from "zod";

export const createClientSchema = z.object({
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
  name: z.string().nonempty("Project name cannot be empty"),
});

export type CreateClientSchema = z.infer<typeof createClientSchema>;
