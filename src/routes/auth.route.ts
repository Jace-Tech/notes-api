import { Router } from "express";
import * as Middlewares from "../middlewares";
import { UserSchema } from "../schema/user.schema";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post(
  "/register",
  Middlewares.validateBody(UserSchema.registerUser),
  AuthController.register,
);
authRouter.post("/login", Middlewares.validateBody(UserSchema.loginUser), AuthController.login);

export default authRouter;
