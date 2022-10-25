import { NextFunction, Request, Response } from 'express';

import logger from '../services/logger.service';

async function log(req: Request, res: Response, next: NextFunction) {
	logger.info('Req was made');
	next();
}

module.exports = { log };
