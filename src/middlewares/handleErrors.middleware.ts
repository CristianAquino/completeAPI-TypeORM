import { NextFunction, Request, Response } from "express";
import { validationError } from "../utils";

function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = error;
  }
  const { code, message } = validationError(errorMessage);
  res.status(code).send(message);
}

export { handleError };
