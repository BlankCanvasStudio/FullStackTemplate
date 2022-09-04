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
exports.authSignUp = exports.authLogin = void 0;
var jwt = require("jsonwebtoken");
let authStringLocation = process.env.appSrc + '/queries/users/auth';
let add_new_user = require(authStringLocation).add_new_user;
let verify_login = require(authStringLocation).verify_login;
let AuthReturnValues = require(authStringLocation).ReturnValues;
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let login_result = yield verify_login(req.body.username, req.body.password); // Figure out how to type login_result:AuthReturnValues
    switch (login_result.response) {
        case AuthReturnValues.SUCCESS:
            let userID = login_result.userID;
            var token = jwt.sign({ userID }, process.env.JWT_SECRET, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).json({
                id: userID,
                username: req.body.username,
                accessToken: token
            });
            break;
        case AuthReturnValues.NO_LOGIN:
            res.status(401).json({
                accessToken: null,
                message: "Invalid Username or Password!"
            });
            break;
        case AuthReturnValues.INVALID_NUM_USERS:
            res.status(404).json({
                message: "Invalid Username."
            });
            break;
        case AuthReturnValues.INVALID_AUTH_STRATEGY:
            res.status(404).json({
                message: "Invalid Authentication Strategy"
            });
            break;
        default:
        case AuthReturnValues.ERROR:
            res.status(500).json({
                message: "Unknown Critical Error Encountered. Please Contact Staff"
            });
            break;
    }
});
exports.authLogin = authLogin;
const authSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield add_new_user(req.body.username, req.body.password, req.body.pronouns, 'local');
        if (result !== AuthReturnValues.SUCCESS) {
            res.status(500).send({ signup: "fail" });
        }
        else {
            res.status(201).send({ signup: "success" });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.authSignUp = authSignUp;
