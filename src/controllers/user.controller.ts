import { NextFunction, Request, Response } from "express";
import { userDeleteById, userEditById, userFindById } from "../services";
import { RequestExtens } from "../types";

async function userById(req: RequestExtens, res: Response, next: NextFunction) {
  try {
    const { id } = req;
    const response = await userFindById(id as number);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function userEdit(req: RequestExtens, res: Response, next: NextFunction) {
  try {
    const { id, body } = req;
    const response = await userEditById(id as number, body);
    return res.status(201).json({ message: response });
  } catch (error) {
    next(error);
  }
}

async function userDelete(
  req: RequestExtens,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req;
    const response = await userDeleteById(id as number);
    return res.status(201).json({ message: response });
  } catch (error) {
    next(error);
  }
}

export { userById, userEdit, userDelete };
