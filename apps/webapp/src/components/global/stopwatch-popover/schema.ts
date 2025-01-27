import { z } from "zod";

export const timerSchema = z.object({
  projectId: z.string().uuid().optional().nullable(),
  taskId: z.string().uuid().optional().nullable(),
  description: z.string().optional(),
});

export type TimerSchema = z.infer<typeof timerSchema>;
