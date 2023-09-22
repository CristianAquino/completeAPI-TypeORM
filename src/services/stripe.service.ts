import { Stripe } from "stripe";

const { SECRET_KEY_STRIPE } = process.env;

async function callAllProducts() {
  const stripe = new Stripe(SECRET_KEY_STRIPE as string, {
    apiVersion: "2023-08-16",
  });
  if (!stripe) throw new Error("NOT_FOUND");
  const prices = await stripe.prices.list();
  if (!prices) throw new Error("NOT_FOUND");
  return prices;
}

export { callAllProducts };
