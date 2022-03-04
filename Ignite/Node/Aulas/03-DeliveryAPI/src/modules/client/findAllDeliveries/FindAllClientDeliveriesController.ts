import { Request, Response } from 'express';

import { FindAllClientDeliveriesUseCase } from './FindAllClientDeliveriesUseCase';

export class FindAllClientDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_client } = request;
    const findAllDeliveriesUseCase = new FindAllClientDeliveriesUseCase();

    const result = await findAllDeliveriesUseCase.execute(id_client);

    return response.json(result);
  }
}
