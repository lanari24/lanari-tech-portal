import { z } from 'zod';

export const projectStatusValues = ['active', 'pipeline', 'completed'] as const;

export const createProjectSchema = z.object({
  name: z.string().min(1).max(200),
  client: z.string().min(1).max(200),
  leadEngineer: z.string().min(1).max(200),
  codeName: z.string().min(1).max(60).optional(),
  progress: z.number().int().min(0).max(100).optional(),
  status: z.enum(projectStatusValues).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
