import { Router } from 'express';
import log from '../../middlewares/logger-middleware';
import requireAuth from '../../middlewares/require-auth-middleware';
import * as userController from './user.controller';
const router = Router();

// middleware that is specific to this router
router.use(log);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.get('/email/:email', userController.isEmailOccupied);
router.put('/:id', requireAuth, userController.updateUser);
router.delete('/:id', requireAuth, userController.removeUser);

export default router;
