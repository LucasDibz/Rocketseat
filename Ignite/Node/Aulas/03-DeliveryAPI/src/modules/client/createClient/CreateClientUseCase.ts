import { hash } from 'bcrypt';

import { db } from '@prisma/db.server';

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    // Username must be unique
    const existingUser = await db.clients.findFirst({
      where: {
        username,
      },
    });
    if (existingUser) {
      throw new Error('Client already exists');
    }

    // Encrypt password
    const encryptedPassword = await hash(password, 10);

    // Save client
    const client = await db.clients.create({
      data: {
        username,
        password: encryptedPassword,
      },
    });

    return client;
  }
}
