import { db } from '@prisma/db.server';

export class FindAllDeliverymanDeliveriesUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await db.deliveryman.findFirst({
      where: {
        id: id_deliveryman,
      },
      select: {
        id: true,
        deliveries: true,
        username: true,
      },
    });

    return deliveries;
  }
}
