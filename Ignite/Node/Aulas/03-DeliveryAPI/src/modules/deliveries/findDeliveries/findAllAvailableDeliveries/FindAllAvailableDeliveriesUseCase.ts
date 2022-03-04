import { db } from '@prisma/db.server';

export class FindAllAvailableDeliveriesUseCase {
  async execute() {
    const deliveries = db.deliveries.findMany({
      where: {
        ended_at: null,
        id_deliveryman: null,
      },
    });

    return deliveries;
  }
}
