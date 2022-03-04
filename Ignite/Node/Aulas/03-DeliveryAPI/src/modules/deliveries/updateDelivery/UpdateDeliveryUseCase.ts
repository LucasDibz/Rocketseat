import { db } from '@prisma/db.server';

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateDeliveryUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
    const delivery = await db.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });

    return delivery;
  }
}
