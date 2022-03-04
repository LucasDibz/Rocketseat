import { hash } from 'bcrypt';

import { db } from '@prisma/db.server';

interface ICreateDeliveryMan {
  username: string;
  password: string;
}

export class CreateDeliveryManUseCase {
  async execute({ username, password }: ICreateDeliveryMan) {
    // Username must be unique
    const existingDeliveryman = await db.deliveryman.findFirst({
      where: {
        username,
      },
    });
    if (existingDeliveryman) {
      throw new Error('Deliveryman already exists');
    }

    // Encrypt password
    const encryptedPassword = await hash(password, 10);

    // Save deliveryman
    const deliveryman = await db.deliveryman.create({
      data: {
        username,
        password: encryptedPassword,
      },
    });

    return deliveryman;
  }
}
