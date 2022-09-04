"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errors_1 = require("../controllers/errors");
const errorRouter = (0, express_1.Router)();
errorRouter.get('/loading-error', errors_1.errorPage);
module.exports = errorRouter;
