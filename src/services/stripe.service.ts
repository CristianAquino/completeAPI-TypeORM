import { Stripe } from "stripe";
import { CheckoutType } from "../types";

const { SECRET_KEY_STRIPE } = process.env;

async function callAllPriceProducts() {
  const stripe = new Stripe(SECRET_KEY_STRIPE as string, {
    apiVersion: "2023-08-16",
  });
  if (!stripe) throw new Error("NOT_FOUND");
  const prices = await stripe.prices.list();
  if (!prices) throw new Error("NOT_FOUND");
  return prices;
}

async function callCheckout(data: CheckoutType) {
  const stripe = new Stripe(SECRET_KEY_STRIPE as string, {
    apiVersion: "2023-08-16",
  });
  if (!stripe) throw new Error("NOT_FOUND");
  const session = await stripe.checkout.sessions.create({
    line_items: [...data],
    mode: "subscription",
    payment_method_types: ["card"],
    success_url: "https://personal-portfolio-chi-sandy.vercel.app/",
    cancel_url: "http://localhost:3000/",
  });
  if (!session) throw new Error("NOT_FOUND");
  return { url: session.url };
}
export { callAllPriceProducts, callCheckout };
