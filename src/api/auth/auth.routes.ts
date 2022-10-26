import { Router } from 'express';
import { login, signup, logout } from './auth.controller';
const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

export default router;
