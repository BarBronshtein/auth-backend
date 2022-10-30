"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.login);
router.post('/signup', auth_controller_1.signup);
router.post('/logout', auth_controller_1.logout);
exports.default = router;
