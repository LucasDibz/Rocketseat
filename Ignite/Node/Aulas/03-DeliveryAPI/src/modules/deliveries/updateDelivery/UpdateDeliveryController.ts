import { Request, Response } from 'express';

import { UpdateDeliveryUseCase } from './UpdateDeliveryUseCase';

export class UpdateDeliveryController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const updateDeliveryUseCase = new UpdateDeliveryUseCase();
    const result = await updateDeliveryUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return response.json(result);
  }
}
