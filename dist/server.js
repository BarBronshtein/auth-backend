"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Express App Config
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const corsOptions = {
    origin: [
        'http://127.0.0.1:80',
        'http://localhost:80',
        'http://194.233.167.205',
        'http://auth-app-front.s3-website-eu-west-1.amazonaws.com',
        'https://d13brhpf8ykarf.cloudfront.net',
    ],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// app.use(express.static(path.resolve(__dirname, 'public')));
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./api/user/user.routes"));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/user', user_routes_1.default);
// app.get('/**', (req: Request, res: Response) => {
// 	res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
app.listen(process.env.PORT || 5050, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
