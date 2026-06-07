import { z } from "zod";

export class UserSchema {
  static registerUser = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters long"),
      email: z.email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters long"),
    })
    .strict();

  static loginUser = z
    .object({
      email: z.email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters long"),
    })
    .strict();
}
