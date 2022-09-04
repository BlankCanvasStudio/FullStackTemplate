"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authJwt = require('../middleware/authJwt');
const index_1 = require("../controllers/home/index");
const homeRouter = (0, express_1.Router)();
homeRouter.get('/home', [authJwt.verifyToken], index_1.homePage);
module.exports = homeRouter;
