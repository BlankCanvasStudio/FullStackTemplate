"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authJwt_1 = require("../middleware/authJwt");
let userGets = require('../controllers/users/gets');
let userSets = require('../controllers/users/sets');
const usersRouter = (0, express_1.Router)();
usersRouter.get('/profile/info', [authJwt_1.verifyToken], userGets.retrieveProfile);
usersRouter.post('/profile/update', [authJwt_1.verifyToken], userSets.updateProfile);
module.exports = usersRouter;
