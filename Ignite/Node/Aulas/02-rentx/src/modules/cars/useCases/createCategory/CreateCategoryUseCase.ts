import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute({ name, description }: IRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) throw new Error('Category already exists');

    const category = this.categoriesRepository.create({ name, description });

    return category;
  }
}

export { CreateCategoryUseCase };
