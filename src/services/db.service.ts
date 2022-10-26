import { MongoClient, Db } from 'mongodb';

import config from '../config';
import logger from './logger.service';

// Database name
const dbName = 'auth_db';

let dbConn: Db | null = null;

export async function getCollection(collectionName: string) {
	try {
		const db = await connect();
		const collection = await db.collection(collectionName);
		return collection;
	} catch (err) {
		logger.error('Faile to get Mongo collection', err);
		throw err;
	}
}

async function connect() {
	if (dbConn) return dbConn;
	try {
		const client = new MongoClient(config.dbURL);
		const db = client.db(dbName);
		dbConn = db;
		return db;
	} catch (err) {
		logger.error('Cannot Connect to DB', err);
		throw err;
	}
}
