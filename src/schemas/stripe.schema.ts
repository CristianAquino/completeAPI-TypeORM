import { z } from "zod";

const productsSchema = z.object({
  price: z.string().nonempty("identificador requerido"),
  quantity: z
    .number()
    .nonnegative("debe ser un numero positivo")
    .gt(0, "debe ser una cantidad mayor a 0"),
});

const checkoutSchema = z.array(productsSchema);

const idSchema = z.object({
  id: z.string().nonempty("identificador requerido"),
});

export { checkoutSchema, idSchema };
