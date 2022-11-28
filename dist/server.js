'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const cors_1 = __importDefault(require('cors'));
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Express App Config
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'production') {
	const corsOptions = {
		origin: [
			'http://127.0.0.1:8080',
			'http://localhost:8080',
			'http://127.0.0.1:3000',
			'http://127.0.0.1:5173',
			'http://127.0.0.1:5174',
			'http://localhost:3000',
			'http://localhost:5173',
			'http://localhost:5174',
		],
		credentials: true,
	};
	app.use((0, cors_1.default)(corsOptions));
	app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
} else {
	const corsOptions = {
		origin: [
			'http://127.0.0.1:8080',
			'http://localhost:8080',
			'http://127.0.0.1:3000',
			'http://127.0.0.1:5173',
			'http://127.0.0.1:5174',
			'http://localhost:3000',
			'http://localhost:5173',
			'http://localhost:5174',
		],
		credentials: true,
	};
	app.use((0, cors_1.default)(corsOptions));
}
const auth_routes_1 = __importDefault(require('./api/auth/auth.routes'));
const user_routes_1 = __importDefault(require('./api/user/user.routes'));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/user', user_routes_1.default);
app.get('/**', (req, res) => {
	res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
app.listen(process.env.PORT, () => {
	console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
