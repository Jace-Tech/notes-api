import { NextFunction, Request, Response } from "express";
import { UserLoginDto, UserRegisterDto } from "../dto/user";
import userService from "../services/user.service";
import { BadRequestError } from "../utils/error";
import bcrypt from "bcrypt";
import { ResponseUtils } from "../utils/response";
import { JWT } from "../lib/jwt";
import { Utils } from "../utils";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedBody = req.body as UserRegisterDto;

      // CHECK IF EMAIL EXISTS
      const emailExists = await userService.getUserByEmail(validatedBody.email);
      if (emailExists) {
        throw new BadRequestError("Email already exists.");
      }

      // HASH PASSWORD
      const hashedPassword = await bcrypt.hash(validatedBody.password, 10);

      // CREATE USER
      const user = await userService.createUser({
        name: validatedBody.name,
        email: validatedBody.email,
        password: hashedPassword,
      });

      return res.status(201).json(
        ResponseUtils.successResponse({
          data: Utils.filterObjects(user.toJSON(), "password"),
          message: "User registered successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedBody = req.body as UserLoginDto;

      // CHECK IF USER EXISTS
      const user = await userService.getUserByEmail(validatedBody.email);
      if (!user) {
        throw new BadRequestError("Invalid credentials.");
      }

      // CHECK IF PASSWORD IS VALID
      const passwordMatch = await bcrypt.compare(validatedBody.password, user.password);
      if (!passwordMatch) {
        throw new BadRequestError("Invalid credentials.");
      }

      // GENERATE TOKEN
      const auth = JWT.generateToken({ uid: user._id.toString() });

      // CONSTRUCT RESPONSE DATA
      const data = {
        user: Utils.pickObjects(user.toJSON(), "_id", "email", "name"),
        auth,
      };

      return res.status(200).json(
        ResponseUtils.successResponse({
          data: data,
          message: "User logged in successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }
}
