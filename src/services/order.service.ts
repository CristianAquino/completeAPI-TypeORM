import { Order } from "../entities";

async function callAllOrders() {
  const orders = await Order.find();
  if (orders.length === 0) throw new Error("NOT_FOUND");
  return orders;
}

export { callAllOrders };
