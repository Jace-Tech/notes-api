import { Server, IncomingMessage, ServerResponse } from "http";
import mongoose from "mongoose";

export class ServerUtils {
  static async gracefulShutdown(
    server: Server<typeof IncomingMessage, typeof ServerResponse>,
    signal: string,
  ) {
    console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

    const forceExitTimeout = setTimeout(() => {
      console.error("Graceful shutdown timed out! Forcefully shutting down...");
      process.exit(1);
    }, 10000);

    server.close(async () => {
      console.log("HTTP server closed.");
      try {
        if (mongoose.connection.readyState !== 0) {
          await mongoose.connection.close();
          console.log("MongoDB connection closed.");
        }
        console.log("Graceful shutdown completed successfully.");
        clearTimeout(forceExitTimeout);
        process.exit(0);
      } catch (err) {
        console.error("Error during cleanup:", err);
        clearTimeout(forceExitTimeout);
        process.exit(1);
      }
    });
  }
}
