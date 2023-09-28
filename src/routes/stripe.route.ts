import express, { Router } from "express";
import { checkout, webhook } from "../controllers";
import { checkoutSchema } from "../schemas";
import { schemaBodyValidate } from "../middlewares";

const stripeRoute = Router();

// checkout
stripeRoute.post(
  "/create-checkout-session",
  schemaBodyValidate(checkoutSchema),
  checkout
);

// webhook
stripeRoute.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

export { stripeRoute };
