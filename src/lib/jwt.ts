import jwt from "jsonwebtoken";
import { ENV } from "../configs/variables";
import { Utils } from "../utils";

export interface AuthPayload {
  uid: string;
}

export interface DecodedToken {
  data: AuthPayload;
  iat: number;
  exp: number;
}

export class JWT {
  static generateToken(data: AuthPayload) {
    const exp = Utils.getExpDate(60 * 60 * 24 * 7);
    const token = jwt.sign({ exp, data }, ENV.JWT_SECRET);

    return { token, expiresAt: Utils.getDateInISO(exp) };
  }

  static verifyToken(token: string): DecodedToken {
    return jwt.verify(token, ENV.JWT_SECRET) as DecodedToken;
  }
}
