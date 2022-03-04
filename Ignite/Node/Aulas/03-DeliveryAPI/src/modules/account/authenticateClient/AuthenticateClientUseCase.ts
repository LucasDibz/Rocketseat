import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { db } from '@prisma/db.server';

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await db.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error('Username or Password invalid!');
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error('Username or Password invalid!');
    }

    const token = sign(username, 'supersecretk3y', {
      expiresIn: '1d',
    });

    return token;
  }
}
