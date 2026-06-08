import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  instructor: z.string().min(1).max(200).optional(),
  timeLabel: z.string().min(1).max(120).optional(),
  timeSub: z.string().min(1).max(40).optional(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
