import { Router } from "express";
import { allPrices, checkout } from "../controllers";
import { schemaBodyValidate } from "../middlewares";
import { checkoutSchema } from "../schemas";

const stripeRoute = Router();

stripeRoute.get("/all-products", allPrices);
stripeRoute.post(
  "/create-checkout-session",
  schemaBodyValidate(checkoutSchema),
  checkout
);

export { stripeRoute };
