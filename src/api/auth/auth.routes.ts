import { Router } from 'express';
import {
	login,
	signup,
	logout,
	authenticate,
	googleLogin,
} from './auth.controller';
import log from '../../middlewares/logger-middleware';
const router = Router();
router.use(log);

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.post('/googleLogin', googleLogin);
router.get('/authenticate', authenticate);
export default router;
