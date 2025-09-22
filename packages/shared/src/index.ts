import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  priceCents: z.number().int().nonnegative(),
});

export type Product = z.infer<typeof ProductSchema>;
