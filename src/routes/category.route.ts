import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import * as Middlewares from "../middlewares";
import { CategorySchema } from "../schema/category.schema";

const router = Router();

router
  .route("/")
  .post(Middlewares.validateBody(CategorySchema.createCategory), CategoryController.createCategory)
  .get(CategoryController.getAllCategories);

router
  .route("/:categoryId")
  .get(CategoryController.getCategory)
  .delete(CategoryController.deleteCategory);

export default router;
