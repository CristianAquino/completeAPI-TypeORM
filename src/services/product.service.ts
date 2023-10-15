import { Product } from "../entities";
import { slug } from "../utils";

async function callProductBySlug(slug: string) {
  const product = await Product.findOneBy({ slug });
  if (!product) throw new Error("NOT_FOUND");
  return product;
}

async function callAllProducts() {
  const products = await Product.find();
  if (products.length === 0) throw new Error("NOT_FOUND");
  return products;
}

async function callAddProduct(body: any) {
  for (const product of body) {
    const products = new Product();
    const slugOfTitle = slug(product.name);
    products.name = product.name;
    products.unitPrice = product.unitPrice;
    products.unitInStock = product.unitInStock;
    products.description = product.description;
    products.images = product.images;
    products.brand = product.brand;
    products.category = product.category;
    products.slug = slugOfTitle;
    await products.save();
  }
  return "created products";
}

async function callUpdateProduct(body: any) {
  const { id, ...data } = body;
  const product = await Product.findOneBy({ id });
  if (!product) throw new Error("NOT_FOUND");
  await Product.update({ id }, { ...data });
  return "updated product";
}

async function callDeleteProduct(id: string) {
  const product = await Product.findOneBy({ id });
  if (!product) throw new Error("NOT_FOUND");
  await product.remove();
  return "deleted product";
}

export {
  callAllProducts,
  callAddProduct,
  callProductBySlug,
  callUpdateProduct,
  callDeleteProduct,
};
