import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers?.authorization;

  // Unauthorized user
  if (!authHeader) {
    return response.status(401).json({
      message: 'Missing token',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, 'supersecretk3y') as { sub: string };

    request.id_client = sub;

    next();
  } catch (error) {
    // Unauthorized user
    return response.status(401).json({
      message: 'Invalid token',
    });
  }
}
