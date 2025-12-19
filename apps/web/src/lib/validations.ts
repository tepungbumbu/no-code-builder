import { z } from 'zod';

/**
 * Register schema
 */
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Project schema
 */
export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Name too long'),
  template: z.string().optional(),
});

/**
 * Element schema
 */
export const elementSchema = z.object({
  type: z.enum(['heading', 'text', 'image', 'button', 'container', 'grid']),
  props: z.record(z.any()),
  styles: z.object({
    desktop: z.record(z.string()).optional(),
    tablet: z.record(z.string()).optional(),
    mobile: z.record(z.string()).optional(),
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type ElementFormData = z.infer<typeof elementSchema>;
