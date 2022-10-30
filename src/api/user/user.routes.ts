import { Router } from 'express';
import requireAuth from '../../middlewares/require-auth-middleware';
import * as userController from './user.controller';
const router = Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.get('/email/:email', userController.isEmailOccupied);
router.put('/:id', requireAuth, userController.updateUser);
router.delete('/:id', requireAuth, userController.removeUser);

export default router;
