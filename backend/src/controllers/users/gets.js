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
exports.retrieveProfile = exports.verifyAdmin = exports.userRoles = void 0;
const { Pool } = require('pg');
let userGets = require("../../queries/users/gets");
let userAuth = require("../../queries/users/auth");
const gets_1 = require("../../queries/users/gets");
const auth_1 = require("../../queries/users/auth");
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});
function userRoles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let results = yield userGets.user_roles(pool);
            res.status(200).send({ roles: results });
        }
        catch (error) {
            console.log('users.gets.userRoles:\n', error);
            res.status(500).send({ message: 'Reason Unknown' });
        }
    });
}
exports.userRoles = userRoles;
function verifyAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let results = yield userAuth.verify_admin(pool, req.body.userID);
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
            console.log('users.gets.verifyAdmin:\n', error);
            res.status(500).send({ message: 'Reason Unknown' });
        }
    });
}
exports.verifyAdmin = verifyAdmin;
function retrieveProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let results = yield userGets.retrieve_profile(pool, req.body.userID);
            switch (results.status) {
                case gets_1.ReturnValues.INVALID_PG_POOL:
                    res.status(500).send({ message: 'Invalid Pool' });
                    break;
                case gets_1.ReturnValues.INVALID_USER_ID:
                    res.status(400).send({ message: 'Invalid User ID' }); // 
                    break;
                case gets_1.ReturnValues.SUCCESS:
                    res.status(200).send({ data: results }); // Valid but no body
                    break;
                //This case should never be hit
                case gets_1.ReturnValues.ERROR:
                default:
                    res.status(500).send({ message: 'Reason Unknown' });
                    break;
            }
        }
        catch (error) {
            console.log("ERROR! controllers.users.gets.retrieveProfile");
            console.log(error);
            res.status(500).json({
                message: "Unknown Critical Error Encountered. Please Contact Staff"
            });
        }
    });
}
exports.retrieveProfile = retrieveProfile;
