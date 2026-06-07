import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ServerUtils } from "./utils/server";
import { ENV } from "./configs/variables";
import { CustomError } from "./utils/error";
import { ResponseUtils } from "./utils/response";
import connectDB from "./configs/db";
import routes from "./routes/index.route";
import { requestLogger } from "./middlewares/request-logger.middleware";

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ROUTES
app.use("/api", routes);

// HOME
app.get("/", (_: Request, res: Response) => {
  res.status(200).json(
    ResponseUtils.successResponse({
      data: {
        link: "https://documenter.getpostman.com/view/55366763/2sBXwqqqWZ",
      },
      message: `Note API is running. Visit the link for API documentation.`,
    }),
  );
});

// 404 ROUTE
app.use((req: Request, res: Response) => {
  res.status(404).json(
    ResponseUtils.errorResponse({
      data: null,
      message: `Route ${req.originalUrl} doesn't exist.`,
    }),
  );
});

// HANDLE ERROR
app.use((err: any, req: Request, res: Response, _: NextFunction): any => {
  if (!(err instanceof CustomError)) {
    err = new CustomError(err.message, 500, false);
  }
  const statusCode = err.statusCode;
  const message = err.message;
  const isOperational = err.isOperational;

  if (!isOperational && !ENV.isDev) {
    console.error(`[ERROR]💥: ${statusCode}`, err);
    err.message = "Something went wrong! Please try again later.";
  }

  return res
    .status(statusCode)
    .json(ResponseUtils.errorResponse({ data: ENV.isDev ? err.stack : null, message }));
});

// CONNECT TO DATABASE
connectDB().then(() => {
  // START SERVER
  const server = app.listen(ENV.PORT, () => {
    console.log(`Server running at http://localhost:${ENV.PORT}`);
  });

  // HANDLE NODE PROCESS EVENTS
  process.on("SIGTERM", () => ServerUtils.gracefulShutdown(server, "SIGTERM"));
  process.on("SIGINT", () => ServerUtils.gracefulShutdown(server, "SIGINT"));
  process.on("SIGUSR2", () => ServerUtils.gracefulShutdown(server, "SIGUSR2"));

  process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION! Shutting down gracefully...");
    console.error(reason);
    ServerUtils.gracefulShutdown(server, "unhandledRejection");
  });

  process.on("uncaughtException", (error) => {
    console.error("UNCAUGHT EXCEPTION! Shutting down immediately...");
    console.error(error);
    process.exit(1);
  });
});
