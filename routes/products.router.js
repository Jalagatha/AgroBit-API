import { products } from "../controllers/animals.controllers.js";
import { Router } from "express";
const animalRouter = Router();
animalRouter.get("/",products.getProducts);
animalRouter.get("/:id",products.getProductById);
animalRouter.post("/create",products.createProduct);
animalRouter.patch("/:id",products.updateProduct);
animalRouter.delete("/:id",products.deleteProduct);
export default animalRouter;
