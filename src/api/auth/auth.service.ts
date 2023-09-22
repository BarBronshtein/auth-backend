import Cryptr from 'cryptr';
import dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

import { userService } from '../user/user.service';
import logger from '../../services/logger.service';
import { User } from '../../models/user.model';

export interface GoogleUser extends User {
	googleId: string;
}

dotenv.config();

const cryptr = new Cryptr(
	process?.env?.SECRET1 ?? (Deno.env.get('SECRET1') as string)
);

async function login(email: string, password: string) {
	logger.debug(`auth.service - login with email: ${email}`);

	const user = await userService.getByEmail(email);
	if (!user) throw new Error('Invalid email or password');
	if (user.googleId) throw new Error('Google account connect using google');
	// Uncomment for real login
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw new Error('Invalid email or password');

	delete user.password;
	return user;
}

async function signup(email: string, password: string, fullname: string) {
	const saltRounds = 10;

	logger.debug(
		`auth.service - signup with email: ${email}, fullname: ${fullname}`
	);

	if (!email || !password || !fullname)
		// front handles field requirements
		throw new Error('fullname, email and password are required!');

	const hash = await bcrypt.hash(password, saltRounds);
	return userService.add({ email, password: hash, fullname });
}

async function googleLogin(user: GoogleUser) {
	logger.debug(`auth.service - login/signup with gmail: ${user.email}`);
	const userToSend = await userService.getByGoogleId(user.googleId);
	if (!userToSend) return userService.add(user);
	return userToSend as User;
}

function getLoginToken(user: User) {
	return cryptr.encrypt(JSON.stringify(user));
}

function validateToken(loginToken: string) {
	try {
		const json = cryptr.decrypt(loginToken);
		const loggedinUser = JSON.parse(json);
		return loggedinUser;
	} catch (err) {
		console.log('Invalid login token');
	}
	return null;
}

export const authService = {
	signup,
	login,
	getLoginToken,
	validateToken,
	googleLogin,
};
