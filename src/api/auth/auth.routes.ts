import { Router } from 'express';
import { login, signup, logout, authenticate } from './auth.controller';
const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/authenticate', authenticate);
export default router;
