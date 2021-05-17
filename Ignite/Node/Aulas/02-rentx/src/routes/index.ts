import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

router.use('/categories', usersRoutes);
router.use('/specifications', categoriesRoutes);
router.use('/users', specificationsRoutes);

export { router };
