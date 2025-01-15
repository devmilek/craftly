import { z } from "zod";

export const timerSchema = z.object({
  projectId: z.string().uuid().optional(),
  taskId: z.string().uuid().optional(),
  description: z.string().optional(),
});

export type TimerSchema = z.infer<typeof timerSchema>;
