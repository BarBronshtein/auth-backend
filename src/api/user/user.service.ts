import bcrypt from 'bcrypt';
import { User } from './../../models/user.model';
import { getCollection } from '../../services/db.service';
import logger from '../../services/logger.service';
import { ObjectId } from 'mongodb';
export const userService = {
	query,
	getById,
	getByEmail,
	remove,
	update,
	add,
};

async function query(filterBy = {}) {
	// const criteria = _buildCriteria(filterBy);
	try {
		const collection = await getCollection('user');
		var users = await collection.find().toArray();
		users = users.map(user => {
			delete user.password;
			// user.createdAt = ObjectId(user._id).getTimestamp();
			return user;
		});
		return users;
	} catch (err) {
		if (!process.env.CYCLIC_URL) logger.error('cannot find users', err);
		throw err;
	}
}

async function getById(userId: ObjectId | string) {
	try {
		const collection = await getCollection('user');
		const user = await collection.findOne({ _id: new ObjectId(userId) });
		delete user?.password;
		return user;
	} catch (err) {
		if (!process.env.CYCLIC_URL)
			logger.error(`while finding user ${userId}`, err);
		throw err;
	}
}
async function getByEmail(email: string) {
	try {
		const collection = await getCollection('user');
		const user = await collection.find({ email }).toArray();
		return user?.[0];
	} catch (err) {
		if (!process.env.CYCLIC_URL) logger.error(`while finding user ${email}`, err);
		throw err;
	}
}

async function remove(userId: ObjectId | string) {
	try {
		const collection = await getCollection('user');
		await collection.deleteOne({ _id: new ObjectId(userId) });
	} catch (err) {
		if (!process.env.CYCLIC_URL)
			logger.error(`cannot remove user ${userId}`, err);
		throw err;
	}
}

async function update(user: User) {
	try {
		const hash = await bcrypt.hash(user.password as string, 10);
		// peek only updatable fields!
		const userToSave: User = {
			email: user.email,
			fullname: user.fullname,
			bio: user.bio,
			phone: user.phone,
			photo: user.photo,
			password: hash,
		};
		const collection = await getCollection('user');
		await collection.updateOne(
			{ _id: new ObjectId(user._id) },
			{ $set: userToSave }
		);
		userToSave._id = new ObjectId(user._id);
		delete userToSave.password;
		return userToSave;
	} catch (err) {
		if (!process.env.CYCLIC_URL)
			logger.error(`cannot update user ${user._id}`, err);
		throw err;
	}
}

async function add(user: User) {
	try {
		// peek only updatable fields!
		const userToAdd = {
			email: user.email,
			password: user.password,
			fullname: user.fullname,
		};
		const collection = await getCollection('user');
		await collection.insertOne(userToAdd);
		return userToAdd;
	} catch (err) {
		if (!process.env.CYCLIC_URL) logger.error('cannot insert user', err);
		throw err;
	}
}

function _buildCriteria<T>(filterBy: T) {
	const criteria = {};
	return criteria;
}
