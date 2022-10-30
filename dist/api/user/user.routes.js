"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_middleware_1 = __importDefault(require("../../middlewares/require-auth-middleware"));
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// middleware that is specific to this router
// router.use(requireAuth)
router.get('/', user_controller_1.getUsers);
router.get('/:id', user_controller_1.getUser);
router.put('/:id', require_auth_middleware_1.default, user_controller_1.updateUser);
router.delete('/:id', require_auth_middleware_1.default, user_controller_1.removeUser);
exports.default = router;
