import { Router } from "express";
import { allProducts } from "../controllers";

const stripeRoute = Router();

stripeRoute.get("/all-products", allProducts);
export { stripeRoute };
