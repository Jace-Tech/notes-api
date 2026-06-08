import { NextFunction, Request as ExpressRequest, Response } from "express";
import { UnauthorizedError } from "../utils/error";
import { JWT } from "../lib/jwt";

export interface Request extends ExpressRequest {
  uid?: string;
}

export function authorizationMiddleware(req: Request, _: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new UnauthorizedError("No token provided");

    const [_, token] = auth.split(" ");
    if (!token) throw new UnauthorizedError("Invalid token");

    const decodedToken = JWT.verifyToken(token);
    req.uid = decodedToken.data.uid;

    next();
  } catch (error) {
    next(error);
  }
}
