import { Stripe } from "stripe";
import { Order } from "../entities";
import { CheckoutType } from "../types";

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
    customer: customer.id,
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
  console.log(body, sig);
  if (!stripe) throw new Error("NOT_FOUND");
  if (!WEBHOOK_ENDPOINT_SECRET) throw new Error("NOT_FOUND");
  let event: any;
  let data: any;
  let eventType: any;

  event = stripe.webhooks.constructEvent(
    body,
    sig,
    WEBHOOK_ENDPOINT_SECRET as string
  );
  eventType = event.type;
  data = event.data.object;

  if (eventType && eventType === "checkout.session.completed") {
    const customer = await stripe.customers.retrieve(data.customer);
    const order = await callAddOrder(customer, data);
    if (order !== "created order") throw new Error("NO_CONTENT");
  }
  return { message: "created_webhook" };
}

async function callAddOrder(customer: any, data: any) {
  const items = JSON.parse(customer.metadata.products);

  const order = new Order();
  order.idCustomer = data.id;
  order.customerCountry = data.customer_details.address.country;
  order.customerEmail = data.customer_details.email;
  order.customerName = data.customer_details.name;
  order.customerPaymentMethod = data.payment_method_types[0];
  order.customerCurrency = data.currency;
  order.products = items;
  order.subtotal = data.amount_subtotal;
  order.total = data.amount_total;

  if (data.payment_status !== "paid") {
    return "order no pagada";
  }
  await order.save();

  return "created order";
}

export { callCheckout, callWebhook };
