import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import 'express-async-errors';

import { routes } from './routes';

const app = express();

app.use(json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }

    return response
      .status(500)
      .json({ status: 'Error', message: 'Internal server error' });
  },
);

app.listen(3333, () => console.log('App running on port 3333'));
