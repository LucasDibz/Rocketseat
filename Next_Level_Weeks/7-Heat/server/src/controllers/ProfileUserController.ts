import { Request, Response } from 'express';
import { ProfileUserService } from '../services/ProfileUserService';

export function ProfileUserController() {
  return {
    async handle(request: Request, response: Response) {
      const { user_id } = request;

      const service = ProfileUserService();

      const result = await service.execute(user_id);

      return response.json(result);
    },
  };
}
