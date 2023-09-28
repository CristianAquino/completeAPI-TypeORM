import { Router } from "express";
import { allOrders } from "../controllers";

const orderRoute = Router();

orderRoute.get("/all-orders", allOrders);

export { orderRoute };
