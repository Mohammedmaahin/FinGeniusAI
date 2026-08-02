import { z } from "zod";

export const goalSchema = z.object({
  title: z.string().min(3),
  targetAmount: z.number().positive(),
  deadline: z.string()
});