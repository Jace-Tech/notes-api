import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { CategorySchema } from "../schema/category.schema";

const router = Router();

router
  .route("/")
  .post(validateBody(CategorySchema.createCategory), CategoryController.createCategory)
  .get(CategoryController.getAllCategories);

router
  .route("/:categoryId")
  .get(CategoryController.getCategory)
  .delete(CategoryController.deleteCategory);

export default router;
