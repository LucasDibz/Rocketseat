import { Request, Response } from 'express';

import { FindAllDeliverymanDeliveriesUseCase } from './FindAllDeliveriesUseCase';

export class FindAllDeliverymanDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const findAllDeliveriesUseCase = new FindAllDeliverymanDeliveriesUseCase();

    const result = await findAllDeliveriesUseCase.execute(id_deliveryman);

    return response.json(result);
  }
}
