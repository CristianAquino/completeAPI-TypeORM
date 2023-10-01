import { NextFunction, Request, Response } from "express";
import { validationError, validationErrorStripe } from "../utils";
import Stripe from "stripe";

function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof Error) {
    const { code, message } = validationError(error.message);
    return res.status(code).send(message);
  }
  if (error as Stripe.errors.StripeAPIError) {
    const { code, message } = validationErrorStripe(error);
    return res.status(code).send(message);
  }
  console.log(error);
  return res.status(500).send("SERVER ERROR");
}

export { handleError };
