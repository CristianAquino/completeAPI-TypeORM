import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects, ZodError } from "zod";

const schemaParamsValidate =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = req.params;
      schema.parse(validate);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send("zod dice:Bad Request");
      }

      return res.status(500).send("Internal Server Error");
    }
  };

export { schemaParamsValidate };
