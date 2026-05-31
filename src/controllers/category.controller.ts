import { NextFunction, Request, Response } from "express";
import { ResponseUtils } from "../utils/response";
import CategoryService from "../services/category.service";
import { CategorySchema } from "../schema/category.schema";
import { NotFoundError } from "../utils/error";
import { ICategory } from "../models/category.model";

export class CategoryController {
  static async createCategory(req: Request<{}, {}, ICategory>, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.createCategory(req.body);
      return res.status(201).json(
        ResponseUtils.successResponse({
          data: category,
          message: "Category created successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();
      return res.status(200).json(
        ResponseUtils.successResponse({
          data: categories,
          message: "Categories fetched successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedParams = CategorySchema.id.parse(req.params.categoryId);
      const category = await CategoryService.getCategory(validatedParams);
      if (!category) {
        throw new NotFoundError("Category not found.");
      }
      return res.status(200).json(
        ResponseUtils.successResponse({
          data: category,
          message: "Category fetched successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedParams = CategorySchema.id.parse(req.params.categoryId);

      // CHECK IF CATEGORY EXISTS
      const category = await CategoryService.getCategory(validatedParams);
      if (!category) {
        throw new NotFoundError("Category not found.");
      }

      await CategoryService.deleteCategory(validatedParams);
      return res.status(200).json(
        ResponseUtils.successResponse({
          data: category,
          message: "Category deleted successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }
}
