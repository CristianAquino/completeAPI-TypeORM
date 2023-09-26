import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { callCheckout } from "../services";

// checkout
async function checkout(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const response = await callCheckout(body);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return next(error.type);
    }
    return next(error);
  }
}

// webhook
function webhook(req: Request, res: Response, next: NextFunction) {}

export { checkout, webhook };
