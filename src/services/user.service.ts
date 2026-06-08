import User, { IUser } from "../models/user.model";

class UserService {
  async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }

  async createUser(data: Pick<IUser, "name" | "email" | "password">) {
    const user = await User.create(data);
    return user;
  }
}

const userService = new UserService();
export default userService;
