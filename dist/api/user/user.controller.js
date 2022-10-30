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
exports.updateUser = exports.removeUser = exports.getUsers = exports.getUser = void 0;
const user_service_1 = require("./user.service");
const logger_service_1 = __importDefault(require("../../services/logger.service"));
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_service_1.userService.getById(req.params.id);
            res.send(user);
        }
        catch (err) {
            logger_service_1.default.error('Failed to get user', err);
            res.status(500).send({ err: 'Failed to get user' });
        }
    });
}
exports.getUser = getUser;
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const filterBy = {txt: req.query?.txt || ''};
            // const users = await userService.query(filterBy);
            const users = yield user_service_1.userService.query();
            res.send(users);
        }
        catch (err) {
            logger_service_1.default.error('Failed to get users', err);
            res.status(500).send({ err: 'Failed to get users' });
        }
    });
}
exports.getUsers = getUsers;
function removeUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_service_1.userService.remove(req.params.id);
            res.send({ msg: 'Deleted successfully' });
        }
        catch (err) {
            logger_service_1.default.error('Failed to delete user', err);
            res.status(500).send({ err: 'Failed to delete user' });
        }
    });
}
exports.removeUser = removeUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const savedUser = yield user_service_1.userService.update(user);
            res.send(savedUser);
        }
        catch (err) {
            logger_service_1.default.error('Failed to update user', err);
            res.status(500).send({ err: 'Failed to update user' });
        }
    });
}
exports.updateUser = updateUser;
