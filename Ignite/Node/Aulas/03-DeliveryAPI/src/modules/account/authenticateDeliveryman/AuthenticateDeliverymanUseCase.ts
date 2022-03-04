import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { db } from '@prisma/db.server';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await db.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error('Username or Password invalid!');
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error('Username or Password invalid!');
    }

    const token = sign(username, 'supersecretk3y', {
      expiresIn: '1d',
    });

    return token;
  }
}
