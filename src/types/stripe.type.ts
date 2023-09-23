import { z } from "zod";
import { checkoutSchema } from "../schemas";

type CheckoutType = z.infer<typeof checkoutSchema>;

export { CheckoutType };
