"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authJwt_1 = require("../middleware/authJwt");
const search_1 = require("../controllers/users/search");
const searchRouter = (0, express_1.Router)();
searchRouter.get('/users/query_plz', search_1.query_plzController);
searchRouter.get('/users/:username/pronouns', [authJwt_1.verifyToken], search_1.userPronouns);
module.exports = searchRouter;
