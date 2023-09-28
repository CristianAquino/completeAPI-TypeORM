import { NextFunction, Request, Response } from "express";
import { callAllOrders } from "../services";

async function allOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await callAllOrders();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
}

export { allOrders };
