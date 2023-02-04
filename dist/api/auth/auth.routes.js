"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const logger_middleware_1 = __importDefault(require("../../middlewares/logger-middleware"));
const router = (0, express_1.Router)();
router.use(logger_middleware_1.default);
router.post('/login', auth_controller_1.login);
router.post('/signup', auth_controller_1.signup);
router.post('/logout', auth_controller_1.logout);
router.get('/authenticate', auth_controller_1.authenticate);
exports.default = router;
