import { NextFunction, Request, Response } from "express";

export interface RequestLog {
  method: string;
  url: string;
  statusCode: number;
  responseTimeMs: number;
  timestamp: string;
}

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  // LOG THE REQUEST
  res.on("finish", () => {
    const log: RequestLog = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTimeMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };

    console.log(
      `[${log.timestamp}] ${log.method} ${log.url} ${log.statusCode} - ${log.responseTimeMs}ms`,
    );
  });

  next();
}
