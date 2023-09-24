import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { callAllPriceProducts, callCheckout } from "../services";

// prices
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

// products
// async function createProduct(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { body } = req;
//     const response = await callCreateProduct(body);
//     return res.status(200).json(response);
//   } catch (error) {
//     if (error instanceof Stripe.errors.StripeError) {
//       return next(error.type);
//     }
//     return next(error);
//   }
// }
// async function allProducts(req: Request, res: Response, next: NextFunction) {
//   try {
//     const response = await callAllProducts();
//     return res.status(200).json(response);
//   } catch (error) {
//     if (error instanceof Stripe.errors.StripeError) {
//       return next(error.type);
//     }
//     return next(error);
//   }
// }
// async function productById(req: Request, res: Response, next: NextFunction) {
//   try {
//     const { id } = req.params;
//     const response = await callProductById(id);
//     return res.status(200).json(response);
//   } catch (error) {
//     if (error instanceof Stripe.errors.StripeError) {
//       return next(error.type);
//     }
//     return next(error);
//   }
// }

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

export { checkout, allPrices };
