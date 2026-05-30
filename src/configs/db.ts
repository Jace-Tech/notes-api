import mongoose from "mongoose";
import { ENV } from "./variables";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DB_URL, {
      autoIndex: true,
    });
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed.", error);
  }
};

export default connectDB;
