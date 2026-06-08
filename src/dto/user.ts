import z from "zod";
import { UserSchema } from "../schema/user.schema";

export interface UserRegisterDto extends z.infer<typeof UserSchema.registerUser> {}
export interface UserLoginDto extends z.infer<typeof UserSchema.loginUser> {}
