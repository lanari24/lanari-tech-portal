import { z } from 'zod';

export const createResourceSchema = z.object({
  name: z.string().min(1).max(200),
  allocationNode: z.string().min(1).max(120),
  priority: z.enum(['CRITICAL', 'STANDARD', 'HIGH']).optional(),
});

export type CreateResourceInput = z.infer<typeof createResourceSchema>;
