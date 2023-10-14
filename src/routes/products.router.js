import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
import ProductServices from "../services/product.services.js";
import ProductController from "../controllers/products.controlers.js";


const productsRouter = Router();
const PM = new ProductManager();
const productServices = new ProductServices();


productsRouter.get("/", ProductController.getProducts);

productsRouter.get("/:pid", ProductController.getProductsById);

productsRouter.post("/", ProductController.addProduct);

productsRouter.put("/:pid", ProductController.updateProduct);

productsRouter.delete("/:pid", ProductController.deleteProduct);


export default productsRouter;