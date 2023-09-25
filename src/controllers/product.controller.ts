import { NextFunction, Request, Response } from "express";
import {
  callAddProduct,
  callAllProducts,
  callDeleteProduct,
  callProductBySlug,
  callUpdateProduct,
} from "../services";

async function productBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const response = await callProductBySlug(slug);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
}

async function allProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await callAllProducts();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
}

async function addProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const response = await callAddProduct(body);
    return res.status(200).json({ message: response });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const response = await callUpdateProduct(body);
    return res.status(201).json({ message: response });
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const response = await callDeleteProduct(id);
    return res.status(204).json({ message: response });
  } catch (error) {
    return next(error);
  }
}

export { allProducts, addProduct, productBySlug, updateProduct, deleteProduct };
