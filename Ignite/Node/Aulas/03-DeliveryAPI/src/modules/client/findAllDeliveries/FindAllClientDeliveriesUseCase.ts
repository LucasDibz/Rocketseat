import { db } from '@prisma/db.server';

export class FindAllClientDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = await db.clients.findFirst({
      where: {
        id: id_client,
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
