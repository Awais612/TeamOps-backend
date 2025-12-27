import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { logger } from "../utils/loggers/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message || err);

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ message: "Token expired" });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};
