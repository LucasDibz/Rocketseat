import { db } from '@prisma/db.server';

interface ICreateDelivery {
  id_client: string;
  item_name: string;
}

export class CreateDeliveryUseCase {
  async execute({ id_client, item_name }: ICreateDelivery) {
    const delivery = db.deliveries.create({
      data: {
        item_name,
        id_client,
      },
    });

    return delivery;
  }
}
