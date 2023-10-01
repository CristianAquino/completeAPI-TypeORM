import { z } from "zod";

const productsSchema = z.object({
  id: z.string().nonempty("es necesario un identificador"),
  name: z.string().nonempty("es necesario el nombre del producto"),
  brand: z.string().nonempty("es necesario la marca delproducto"),
  unitPrice: z.number().gt(0).default(1),
  description: z.string().default(""),
  image: z.string().nonempty("es necesario la imagen del producto"),
  quantity: z.number().gt(0).default(1),
});

const checkoutSchema = z.array(productsSchema);

export { checkoutSchema };
