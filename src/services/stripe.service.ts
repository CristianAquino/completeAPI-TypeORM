import { Stripe } from "stripe";
import { CheckoutType } from "../types";
import { webhook } from "../controllers";

const { SECRET_KEY_STRIPE, WEBHOOK_ENDPOINT_SECRET } = process.env;

const stripe = new Stripe(SECRET_KEY_STRIPE as string, {
  apiVersion: "2023-08-16",
});

// checkout
async function callCheckout(data: CheckoutType) {
  if (!stripe) throw new Error("NOT_FOUND");
  const customer = await stripe.customers.create({
    metadata: {
      products: JSON.stringify(data.products),
    },
  });
  if (!customer) throw new Error("NO_CONTENT");
  const { products } = data;
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
async function callWebhook(body: any, sig: any) {
  if (!stripe) throw new Error("NOT_FOUND");
  if (!WEBHOOK_ENDPOINT_SECRET) throw new Error("NOT_FOUND");
  let event;
  let data;
  let eventType;

  event = stripe.webhooks.constructEvent(
    body,
    sig,
    WEBHOOK_ENDPOINT_SECRET as string
  );
  eventType = event.type;
  data = event.data.object;

  if (eventType && eventType === "checkout.session.completed") {
    console.log("webhook");
  }
  return { message: "webhook" };
}

export { callCheckout, callWebhook };
