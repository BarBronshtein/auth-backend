import { NextFunction, Request, Response } from 'express';

import logger from '../services/logger.service';

async function log(req: Request, res: Response, next: NextFunction) {
	if (!process.env.CYCLIC_URL) logger.info('Req was made');
	next();
}

export default log;
