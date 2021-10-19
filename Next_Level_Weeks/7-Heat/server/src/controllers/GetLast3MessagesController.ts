import { Request, Response } from 'express';
import { GetLast3MessagesService } from '../services/GetLast3MessagesService';

export function GetLast3MessagesController() {
  return {
    async handle(request: Request, response: Response) {
      const service = GetLast3MessagesService();

      const result = await service.execute();

      return response.json(result);
    },
  };
}
