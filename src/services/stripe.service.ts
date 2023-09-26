import { Stripe } from "stripe";
import { CheckoutType } from "../types";

const { SECRET_KEY_STRIPE } = process.env;

const stripe = new Stripe(SECRET_KEY_STRIPE as string, {
  apiVersion: "2023-08-16",
});

// checkout
async function callCheckout(data: CheckoutType) {
  if (!stripe) throw new Error("NOT_FOUND");
  const { user, products } = data;
  const line_items = products.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.image],
        description: item.description,
        metadata: {
          id: item.id,
        },
      },
      unit_amount: item.unitPrice * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items,
    customer_email: user.email,
    // mode: "subscription" solo si es un plan de suscripcion,
    mode: "payment",
    payment_method_types: ["card"],
    success_url: "https://personal-portfolio-chi-sandy.vercel.app/",
    cancel_url: "http://localhost:3000/",
  });
  if (!session) throw new Error("NOT_FOUND");
  return { url: session.url };
}

// webhook
export { callCheckout };
