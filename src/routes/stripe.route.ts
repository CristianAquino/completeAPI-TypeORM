import { Router } from "express";
import { allPrices, checkout } from "../controllers";
import { schemaBodyValidate, schemaParamsValidate } from "../middlewares";
import { checkoutSchema, idSchema } from "../schemas";

const stripeRoute = Router();

// prices
stripeRoute.get("/all-prices", allPrices);

// products
// stripeRoute.post("/create-product", createProduct);
// stripeRoute.get("/all-products", allProducts);
// stripeRoute.get("/product/:id", schemaParamsValidate(idSchema), productById);

// checkout
stripeRoute.post(
  "/create-checkout-session",
  schemaBodyValidate(checkoutSchema),
  checkout
);

// webhook
stripeRoute.post("/webhook", (req, res) => {});

export { stripeRoute };
