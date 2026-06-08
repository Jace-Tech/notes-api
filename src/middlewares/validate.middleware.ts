import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { BadRequestError } from "../utils/error";

export function validateBody<T extends ZodObject>(schema: T) {
  return (req: Request, _: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues;
      const message = errors
        .map((e: any) => `Field (${e.path.join(".")}): ${e.message}`)
        .join("; ");

      // PASS ERROR TO NEXT
      return next(new BadRequestError(message));
    }

    // UPDATE THE REQUEST BODY
    req.body = result.data;

    next();
  };
}
