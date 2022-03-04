import { Router } from 'express';

// Clients
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { CreateClientController } from './modules/client/createClient/CreateClientController';
import { FindAllClientDeliveriesController } from './modules/client/findAllDeliveries/FindAllClientDeliveriesController';
import { ensureAuthenticateClient } from './modules/middleware/ensureAuthenticateClient';

// Deliveryman
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/authenticateDeliverymanController';
import { CreateDeliverymanController } from './modules/deliveryman/createDeliveryman/CreateDeliverymanController';
import { FindAllDeliverymanDeliveriesController } from './modules/deliveryman/findAllDeliveries/FindAllDeliveriesController';
import { ensureAuthenticateDeliveryman } from './modules/middleware/ensureAuthenticateDeliveryman';

//Delivery
import { FindAllAvailableDeliveriesController } from './modules/deliveries/findDeliveries/findAllAvailableDeliveries/FindAllAvailableDeliveriesController';
import { CreateDeliveryController } from './modules/deliveries/createDelivery/CreateDeliveryController';
import { UpdateDeliveryController } from './modules/deliveries/updateDelivery/UpdateDeliveryController';
import { UpdateEndDateController } from './modules/deliveries/updateEndDate/UpdateEndDateController';

const routes = Router();

// Clients
const createClientController = new CreateClientController();
const findAllClientDeliveriesController =
  new FindAllClientDeliveriesController();
const authenticateClientController = new AuthenticateClientController();

// Deliveryman
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const findAllDeliverymanDeliveriesController =
  new FindAllDeliverymanDeliveriesController();

// Delivery
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableDeliveriesController =
  new FindAllAvailableDeliveriesController();
const updateDeliveryController = new UpdateDeliveryController();
const updateEndDateController = new UpdateEndDateController();

//-----------Routes----------------//
// Clients
routes.post('/client', createClientController.handle);
routes.post('/client/authenticate', authenticateClientController.handle);
routes.get(
  '/client/deliveries',
  ensureAuthenticateClient,
  findAllClientDeliveriesController.handle,
);

// Deliveryman
routes.post('/deliveryman', createDeliverymanController.handle);
routes.post(
  '/deliveryman/authenticate',
  authenticateDeliverymanController.handle,
);
routes.get(
  '/deliveryman/deliveries',
  ensureAuthenticateDeliveryman,
  findAllDeliverymanDeliveriesController.handle,
);

// Delivery
routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryman,
  findAllAvailableDeliveriesController.handle,
);
routes.post(
  '/delivery',
  ensureAuthenticateClient,
  createDeliveryController.handle,
);
routes.patch(
  '/delivery/addDeliveryman/:id',
  ensureAuthenticateDeliveryman,
  updateDeliveryController.handle,
);
routes.patch(
  '/delivery/updateEndDate/:id',
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle,
);

export { routes };
