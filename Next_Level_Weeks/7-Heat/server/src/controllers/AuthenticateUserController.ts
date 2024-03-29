import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export function AuthenticateUserController() {
  return {
    async handle(request: Request, response: Response) {
      const { code } = request.body;

      const service = AuthenticateUserService();

      try {
        const result = await service.execute(code);
        return response.json(result);
      } catch (error) {
        return response.json({ error: error.message });
      }
    },
  };
}
