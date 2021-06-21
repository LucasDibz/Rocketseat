import express from 'express';
import ClassesController from './controllers/classesController';
import ConnectionController from './controllers/connectionsController';

const classesController = new ClassesController();
const connectionsController = new ConnectionController();

const routes = express.Router();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;
