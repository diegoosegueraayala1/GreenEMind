import express, { Router } from "express";
import { createProduct, deleteProducts, getProduct, getProducts, updateProduct } from "../controllers/products.controllers";
import {verifyToken} from "../middlewares/auth";

export const productRouter:Router = express.Router();

productRouter.post('/', [verifyToken], createProduct);
productRouter.get('/', [verifyToken], getProducts);
productRouter.get('/:productID', [verifyToken], getProduct);
productRouter.delete('/:productID', [verifyToken], deleteProducts);
productRouter.patch('/', [verifyToken], updateProduct);