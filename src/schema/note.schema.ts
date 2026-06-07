import { z } from "zod";

export class NoteSchema {
  static readonly id = z.string().min(1, "ID is required");

  static readonly createNote = z
    .object({
      content: z.string().min(1, "Content is required"),
      title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title must be at most 255 characters long")
        .trim(),
      categoryId: z.string().min(1, "Category ID is invalid").trim().optional(),
    })
    .strict();

  static readonly updateNote = NoteSchema.createNote.partial();
}
