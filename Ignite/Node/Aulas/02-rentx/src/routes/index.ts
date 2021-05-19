import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { categoriesRoutes } from './categories.routes';
import { authenticateRoutes } from './authenticate.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

router.use(authenticateRoutes);
router.use('/categories', usersRoutes);
router.use('/users', specificationsRoutes);
router.use('/specifications', categoriesRoutes);

export { router };
