"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../user/user.service");
const logger_service_1 = __importDefault(require("../../services/logger.service"));
dotenv_1.default.config();
const cryptr = new cryptr_1.default(process.env.SECRET1);
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.CYCLIC_URL)
            logger_service_1.default.debug(`auth.service - login with email: ${email}`);
        const user = yield user_service_1.userService.getByEmail(email);
        if (!user)
            throw new Error('Invalid email or password');
        // Uncomment for real login
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            throw new Error('Invalid email or password');
        delete user.password;
        return user;
    });
}
function signup(email, password, fullname) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        if (!process.env.CYCLIC_URL)
            logger_service_1.default.debug(`auth.service - signup with email: ${email}, fullname: ${fullname}`);
        // if (!email || !password || !fullname) // front handles field requirements
        //   throw new Error('fullname, email and password are required!');
        const hash = yield bcrypt_1.default.hash(password, saltRounds);
        return user_service_1.userService.add({ email, password: hash, fullname });
    });
}
function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user));
}
function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken);
        const loggedinUser = JSON.parse(json);
        return loggedinUser;
    }
    catch (err) {
        console.log('Invalid login token');
    }
    return null;
}
exports.authService = {
    signup,
    login,
    getLoginToken,
    validateToken,
};
