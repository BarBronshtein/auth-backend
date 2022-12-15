import { User } from './../../models/user.model';
import { authService } from './auth.service';
import logger from '../../services/logger.service';
import { Request, Response } from 'express';

async function login(req: Request, res: Response) {
	const { email, password } = req.body;
	try {
		const user = await authService.login(email, password);
		const loginToken = authService.getLoginToken(user as User);
		if (!process.env.CYCLIC_URL) logger.info('User login: ', user);
		res.cookie('loginToken', loginToken);
		res.json(user);
	} catch (err) {
		if (!process.env.CYCLIC_URL) logger.error('Failed to Login ' + err);
		res.status(401).send({ err: 'Failed to Login' });
	}
}

async function signup(req: Request, res: Response) {
	try {
		const { email, password, fullname } = req.body;
		// Never log passwords
		// logger.debug(fullname + ', ' + email + ', ' + password)
		const account = await authService.signup(email, password, fullname);
		if (!process.env.CYCLIC_URL)
			logger.debug(`auth.route - new account created: ` + JSON.stringify(account));
		const user = await authService.login(email, password);
		const loginToken = authService.getLoginToken(user as User);
		if (!process.env.CYCLIC_URL) logger.info('User login: ', user);
		res.cookie('loginToken', loginToken);
		res.json(user);
	} catch (err) {
		if (!process.env.CYCLIC_URL) logger.error('Failed to signup ' + err);
		res.status(500).send({ err: 'Failed to signup' });
	}
}

async function logout(req: Request, res: Response) {
	try {
		res.clearCookie('loginToken');
		res.send({ msg: 'Logged out successfully' });
	} catch (err) {
		res.status(500).send({ err: 'Failed to logout' });
	}
}

export { login, signup, logout };
