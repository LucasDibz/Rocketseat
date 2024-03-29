import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

export function CreateMessageController() {
  return {
    async handle(request: Request, response: Response) {
      const { message } = request.body;
      const { user_id } = request;

      const service = CreateMessageService();

      const result = await service.execute(message, user_id);

      return response.json(result);
    },
  };
}
