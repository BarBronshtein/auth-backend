import { Request, Response, NextFunction } from 'express';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.cookies?.loginToken) return res.status(401).send('Not Authenticated');
	const loggedinUser = '';
	if (!loggedinUser) return res.status(401).send('Not authenticated');
	next();
};

export default requireAuth;
