import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { callAllPriceProducts, callCheckout } from "../services";

async function allPrices(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await callAllPriceProducts();
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return next(error.type);
    }
    return next(error);
  }
}

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

export { allPrices, checkout };
