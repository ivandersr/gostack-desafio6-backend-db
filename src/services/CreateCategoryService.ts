import { getRepository } from 'typeorm';
import Category from '../models/Category';

class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const categoryExists = await categoriesRepository.findOne({
      where: { title },
    });

    if (categoryExists) {
      return categoryExists;
    }

    const category = categoriesRepository.save({
      title,
    });

    return category;
  }
}

export default CreateCategoryService;
