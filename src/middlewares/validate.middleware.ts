import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { CustomError } from "../utils/error";

export function validateBody<T extends ZodObject>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues;
      const message = errors
        .map((e: any) => `Field (${e.path.join(".")}) -> ${e.message}`)
        .join("; ");

      // PASS ERROR TO NEXT
      return next(new CustomError(message, 422));
    }

    // UPDATE THE REQUEST BODY
    req.body = result.data;

    next();
  };
}
