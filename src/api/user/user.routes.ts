import { Router } from 'express';
import requireAuth from '../../middlewares/require-auth-middleware';
import { getUser, getUsers, removeUser, updateUser } from './user.controller';
const router = Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', requireAuth, updateUser);
router.delete('/:id', requireAuth, removeUser);

export default router;
