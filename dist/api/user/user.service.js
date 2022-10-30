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
exports.userService = void 0;
const db_service_1 = require("../../services/db.service");
const logger_service_1 = __importDefault(require("../../services/logger.service"));
const mongodb_1 = require("mongodb");
exports.userService = { query, getById, getByEmail, remove, update, add };
function query(filterBy = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        // const criteria = _buildCriteria(filterBy);
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            var users = yield collection.find().toArray();
            users = users.map(user => {
                delete user.password;
                // user.createdAt = ObjectId(user._id).getTimestamp();
                return user;
            });
            return users;
        }
        catch (err) {
            logger_service_1.default.error('cannot find users', err);
            throw err;
        }
    });
}
function getById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            const user = yield collection.findOne({ _id: new mongodb_1.ObjectId(userId) });
            user === null || user === void 0 ? true : delete user.password;
            return user;
        }
        catch (err) {
            logger_service_1.default.error(`while finding user ${userId}`, err);
            throw err;
        }
    });
}
function getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            const user = yield collection.findOne({ email });
            return user;
        }
        catch (err) {
            logger_service_1.default.error(`while finding user ${email}`, err);
            throw err;
        }
    });
}
function remove(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('user');
            yield collection.deleteOne({ _id: new mongodb_1.ObjectId(userId) });
        }
        catch (err) {
            logger_service_1.default.error(`cannot remove user ${userId}`, err);
            throw err;
        }
    });
}
function update(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // peek only updatable fields!
            const userToSave = {
                email: user.email,
                fullname: user.fullname,
                bio: user.bio,
                phone: user.phone,
                photo: user.photo,
                password: user.password,
                // TODO: add ability to edit password aswell
            };
            const collection = yield (0, db_service_1.getCollection)('user');
            yield collection.updateOne({ _id: new mongodb_1.ObjectId(user._id) }, { $set: userToSave });
            userToSave._id = new mongodb_1.ObjectId(user._id);
            return userToSave;
        }
        catch (err) {
            logger_service_1.default.error(`cannot update user ${user._id}`, err);
            throw err;
        }
    });
}
function add(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // peek only updatable fields!
            const userToAdd = {
                email: user.email,
                password: user.password,
                fullname: user.fullname,
            };
            const collection = yield (0, db_service_1.getCollection)('user');
            yield collection.insertOne(userToAdd);
            return userToAdd;
        }
        catch (err) {
            logger_service_1.default.error('cannot insert user', err);
            throw err;
        }
    });
}
function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}
