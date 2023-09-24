import { Stripe } from "stripe";
import { CheckoutType } from "../types";

const { SECRET_KEY_STRIPE } = process.env;

const stripe = new Stripe(SECRET_KEY_STRIPE as string, {
  apiVersion: "2023-08-16",
});

// prices
async function callAllPriceProducts() {
  if (!stripe) throw new Error("NOT_FOUND");
  const prices = await stripe.prices.list();
  if (!prices) throw new Error("NOT_FOUND");
  return prices;
}

// async function callCreatePrice(product: any, id: any) {
//   if (!stripe) throw new Error("NOT_FOUND");
//   const confirm = await stripe.prices.create({
//     product: id,
//     nickname: product.name,
//     unit_amount: product.unit_amount,
//     currency: product.currency,
//     // recurring: { interval: "month" solo si es un plan mensual, anual o diario
//   });
//   if (!confirm) throw new Error("NOT_FOUND");
//   return "CREATED_PRICE";
// }

// products
// async function callCreateProduct(products: [any]) {
//   if (!stripe) throw new Error("NOT_FOUND");
//   for (let product of products) {
//     const { id } = await stripe.products.create({
//       name: product.name,
//       description: product.description,
//       images: product.images,
//     });
//     await callCreatePrice(product, id);
//   }
//   return "CREATED_PRODUCTS";
// }
// async function callAllProducts() {
//   if (!stripe) throw new Error("NOT_FOUND");
//   const products = await stripe.products.list({ limit: 10 });
//   if (products.data.length === 0) throw new Error("NOT_FOUND");
//   return products;
// }
// async function callProductById(id: string) {
//   if (!stripe) throw new Error("NOT_FOUND");
//   const product = await stripe.products.retrieve(id);
//   if (!product) throw new Error("NOT_FOUND");
//   return product;
// }

// checkout
async function callCheckout(data: CheckoutType) {
  if (!stripe) throw new Error("NOT_FOUND");
  const session = await stripe.checkout.sessions.create({
    line_items: [...data],
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
export { callCheckout, callAllPriceProducts };
