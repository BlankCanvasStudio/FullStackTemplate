"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../controllers/auth/login");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', login_1.authLogin);
authRouter.post('/signup', login_1.authSignUp);
module.exports = authRouter;
