import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      const category = this.createCategoryUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(category);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateCategoryController };
