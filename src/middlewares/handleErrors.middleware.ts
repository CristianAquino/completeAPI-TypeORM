import { NextFunction, Request, Response } from "express";
import { validationError } from "../utils";

function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { code, message } = validationError(error.message);
  res.status(code).send(message);
}

export { handleError };
