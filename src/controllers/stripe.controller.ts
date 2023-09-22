import { NextFunction, Request, Response } from "express";
import { callAllProducts } from "../services";
import Stripe from "stripe";

async function allProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await callAllProducts();
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return next(error.type);
    }
    return next(error);
  }
}

export { allProducts };
