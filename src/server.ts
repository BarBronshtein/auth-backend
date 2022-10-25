import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

const port = 5050;
const app = express();

// Express App Config
app.use(express.json());

if (process.env.NODE_ENV == 'production')
	app.use(express.static(path.resolve(__dirname, 'public')));
else {
	const corsOptions = {
		origin: [
			'http://127.0.0.1:8080',
			'http://localhost:8080',
			'http://127.0.0.1:3000',
			'http://localhost:3000',
		],
		credentials: true,
	};
	app.use(cors(corsOptions));
}
app.get('/**', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is running at https://localhost:${port}`);
});
