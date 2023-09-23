import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodArray, ZodEffects, ZodError } from "zod";

const schemaBodyValidate =
  (schema: AnyZodObject | ZodEffects<AnyZodObject> | ZodArray<AnyZodObject>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = req.body;
      schema.parse(validate);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .send("Verifique si la informacion ingresada es correcta");
      }

      return res.status(500).send("Internal Server Error");
    }
  };

export { schemaBodyValidate };
