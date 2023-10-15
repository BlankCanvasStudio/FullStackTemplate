"use strict";
// import { runInNewContext } from "vm";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySameUser = exports.verifyAdmin = exports.findOptionalToken = exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const authUsersQueries = require("../queries/users/auth");
const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});
let findOptionalToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        next();
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            next();
            return;
        }
        req.body.userID = decoded.userID;
        next();
    });
};
exports.findOptionalToken = findOptionalToken;
let verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.body.userID = decoded.userID;
        next();
    });
};
exports.verifyToken = verifyToken;
let verifyAdmin = (req, res, next) => {
    let userID = req.body.userID; // This should be set in verifyToken
    authUsersQueries.verify_admin(pool, userID).then((results) => {
        if (results === authUsersQueries.ReturnValues.SUCCESS) {
            next();
        }
        else {
            // One could add better redirects here but I won't for now cause this is the auth system. 
            // As little info as possible ig
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
    });
};
exports.verifyAdmin = verifyAdmin;
let verifySameUser = (req, res, next) => {
    let userID_params = req.params.userID;
    let userID_body = req.body.userID; // This should be set in verifyToken
    if (userID_params !== userID_body) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
    }
    else {
        next();
    }
};
exports.verifySameUser = verifySameUser;
