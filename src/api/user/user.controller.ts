import { Request, Response } from 'express';

import { userService } from './user.service';
import logger from '../../services/logger.service';

async function getUser(req: Request, res: Response) {
	try {
		const user = await userService.getById(req.params.id);
		res.send(user);
	} catch (err) {
		logger.error('Failed to get user', err);
		res.status(500).send({ err: 'Failed to get user' });
	}
}

async function isEmailOccupied(req: Request, res: Response) {
	try {
		const bool = await userService.isEmailOccupied(req.params.email);
		res.send(bool);
	} catch (err) {
		logger.error('Failed to get user', err);
		res.status(500).send({ err: 'Failed to get user' });
	}
}

async function getUsers(req: Request, res: Response) {
	try {
		// const filterBy = {txt: req.query?.txt || ''};
		// const users = await userService.query(filterBy);
		const users = await userService.query();
		res.send(users);
	} catch (err) {
		logger.error('Failed to get users', err);
		res.status(500).send({ err: 'Failed to get users' });
	}
}

async function removeUser(req: Request, res: Response) {
	try {
		await userService.remove(req.params.id);
		res.send({ msg: 'Deleted successfully' });
	} catch (err) {
		logger.error('Failed to delete user', err);
		res.status(500).send({ err: 'Failed to delete user' });
	}
}

async function updateUser(req: Request, res: Response) {
	try {
		const user = req.body;
		const savedUser = await userService.update(user);
		res.send(savedUser);
	} catch (err) {
		logger.error('Failed to update user', err);
		res.status(500).send({ err: 'Failed to update user' });
	}
}

export { getUser, getUsers, removeUser, updateUser, isEmailOccupied };
