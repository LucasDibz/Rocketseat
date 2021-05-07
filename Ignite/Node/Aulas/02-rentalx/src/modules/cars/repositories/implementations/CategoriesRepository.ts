import { Category } from '../../model/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  //singleton
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE)
      CategoriesRepository.INSTANCE = new CategoriesRepository();

    return this.INSTANCE;
  }

  list(): Category[] {
    return this.categories;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);

    return category;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
