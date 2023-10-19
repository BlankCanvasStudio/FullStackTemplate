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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
var jwt = require("jsonwebtoken");
const authQueries = require('../../queries/users/auth');
const auth_1 = require("../../queries/users/auth");
const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});
pool.connect();
const authAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = yield authQueries.verify_admin(pool, req.body.userID);
        switch (results) {
            case auth_1.ReturnValues.SUCCESS:
                res.status(200).send({ admin: true });
                break;
            default:
                res.status(200).send({ admin: false });
                break;
        }
    }
    catch (error) {
        console.log('auth.admin.authAdmin:\n', error);
        res.status(500).send({ message: 'Reason Unknown' });
    }
});
exports.authAdmin = authAdmin;
