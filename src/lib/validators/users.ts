import { z } from "zod";

// example schemas for users

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(1).max(100).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
