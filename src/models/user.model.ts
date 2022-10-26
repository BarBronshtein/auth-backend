import { ObjectId } from 'mongodb';

export interface User {
	photo?: string;
	bio?: string;
	fullname: string;
	email: string;
	password: string;
	phone?: string;
	_id?: ObjectId;
}
