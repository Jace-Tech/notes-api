import { z } from "zod";

export class CategorySchema {
  static readonly id = z.string().min(1, "ID is required");

  static readonly createCategory = z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be at most 100 characters long")
      .trim(),
  });
}
