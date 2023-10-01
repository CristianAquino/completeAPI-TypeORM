import bodyParser from "body-parser";
import { Router } from "express";
import { checkout, webhook } from "../controllers";
import { schemaBodyValidate } from "../middlewares";
import { checkoutSchema } from "../schemas";

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
  // bodyParser.raw({ type: "application/json" }),
  webhook
);

export { stripeRoute };
