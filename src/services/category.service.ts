import Category, { ICategory } from "../models/category.model";

class CategoryService {
  async createCategory(data: ICategory) {
    const category = await Category.create(data);
    return category;
  }

  async getAllCategories() {
    const categories = await Category.find();
    return categories;
  }

  async getCategory(id: string) {
    const category = await Category.findById(id);
    return category;
  }

  async deleteCategory(id: string) {
    const category = await Category.findByIdAndDelete(id);
    return category;
  }
}

const categoryService = new CategoryService();
export default categoryService;
