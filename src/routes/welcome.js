"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const welcome_1 = require("../controllers/welcome");
const welcomeRouter = (0, express_1.Router)();
welcomeRouter.get('/', welcome_1.welcomeController);
welcomeRouter.get('/welcome', welcome_1.welcomeController);
module.exports = welcomeRouter;
