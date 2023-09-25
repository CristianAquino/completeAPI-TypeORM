import { Router } from "express";
import {
  allProducts,
  addProduct,
  productBySlug,
  updateProduct,
  deleteProduct,
} from "../controllers";

const productRoute = Router();

productRoute.get("/all-products", allProducts);
productRoute.post("/add-product", addProduct);
productRoute.put("/update-product", updateProduct);
productRoute.delete("/delete-product/:id", deleteProduct);
productRoute.get("/:slug", productBySlug);

export { productRoute };
