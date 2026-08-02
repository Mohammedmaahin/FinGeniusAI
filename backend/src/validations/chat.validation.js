import { z } from "zod";

export const chatSchema = z.object({
  message: z
    .string()
    .min(2, "Message is too short")
    .max(500, "Message is too long"),
});