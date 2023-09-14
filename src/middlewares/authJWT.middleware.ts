import { NextFunction, Response } from "express";
import { confirmToken } from "../utils";
import { RequestExtens } from "../types";

async function verifyToken(
  req: RequestExtens,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  try {
    if (
      !(authorization && authorization.toLocaleLowerCase().startsWith("bearer"))
    ) {
      throw new Error("UNAUTHORIZED");
    }

    const token = authorization.split(" ")[1];
    const decode: any = confirmToken(token);
    req.id = decode.id;
  } catch (error) {
    return next(error);
  }
  next();
}

export { verifyToken };
