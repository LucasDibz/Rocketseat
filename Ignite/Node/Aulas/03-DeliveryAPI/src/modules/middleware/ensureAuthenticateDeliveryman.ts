import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers?.authorization;

  // Unauthorized deliveryman
  if (!authHeader) {
    return response.status(401).json({
      message: 'Missing token',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, 'supersecretk3y') as { sub: string };

    request.id_deliveryman = sub;

    next();
  } catch (error) {
    // Unauthorized deliveryman
    return response.status(401).json({
      message: 'Invalid token',
    });
  }
}
