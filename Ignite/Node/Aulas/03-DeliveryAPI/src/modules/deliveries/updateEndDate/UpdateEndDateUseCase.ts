import { db } from '@prisma/db.server';

interface IUpdateEndDateUseCase {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateEndDateUseCase) {
    const delivery = await db.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
      data: {
        ended_at: new Date(),
      },
    });

    return delivery;
  }
}
