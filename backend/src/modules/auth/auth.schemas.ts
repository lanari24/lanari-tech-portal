import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Passkey must be at least 8 characters'),
  name: z.string().min(1).max(120).optional(),
  role: z.enum(['client', 'student']).default('client'),
});

export const loginSchema = z.object({
  // Access identifier (ref like CLI-402-990) OR email.
  identifier: z.string().min(1),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
