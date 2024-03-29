import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const app = express();

// Express App Config
app.use(cookieParser());
app.use(express.json());
// Passport configuration
const corsOptions = {
	origin: [
		'http://127.0.0.1:80',
		'http://localhost:80',
		'http://localhost:5173',
		'http://localhost:3000',
		'http://127.0.0.1:5173',
		'http://auth-app-front.s3-website-eu-west-1.amazonaws.com',
		'https://d13brhpf8ykarf.cloudfront.net',
	],
	credentials: true,
};
app.use(cors(corsOptions));
// app.use(express.static(path.resolve(__dirname, 'public')));

import authRoutes from './api/auth/auth.routes';
import userRoutes from './api/user/user.routes';

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// app.get('/**', (req: Request, res: Response) => {
// 	res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(5050, () => {
	console.log(`Server is running at http://localhost:5050`);
});
