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
exports.add_new_user = exports.verify_login = exports.ReturnValues = void 0;
const bcrypt = require('bcrypt');
const { Pool, Client } = require('pg');
const LocalStrategy = require('passport-local').Strategy;
var ReturnValues;
(function (ReturnValues) {
    ReturnValues[ReturnValues["SUCCESS"] = 0] = "SUCCESS";
    ReturnValues[ReturnValues["ERROR"] = -1] = "ERROR";
    ReturnValues[ReturnValues["ERROR_USERS_EXISTS"] = 2] = "ERROR_USERS_EXISTS";
    ReturnValues[ReturnValues["INVALID_AUTH_STRATEGY"] = 3] = "INVALID_AUTH_STRATEGY";
    ReturnValues[ReturnValues["INVALID_NUM_USERS"] = 4] = "INVALID_NUM_USERS";
    ReturnValues[ReturnValues["NO_LOGIN"] = 5] = "NO_LOGIN";
})(ReturnValues || (ReturnValues = {}));
exports.ReturnValues = ReturnValues;
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});
pool.connect();
function verify_login(username, password, auth = 'local') {
    return __awaiter(this, void 0, void 0, function* () {
        // Default case is an error. Should always be change but just in case
        let ret_val = {
            response: ReturnValues.ERROR,
            userID: '',
        };
        if (auth == 'local') {
            // Get the hashed password for the given username
            let query_text = "SELECT ID, PASSWORD FROM USERS WHERE name=$1;";
            let results = (yield pool.query(query_text, [username])).rows;
            if (results.length == 1) {
                // If there is a single user with that username, compare the hashed password with the given password and return result
                let enc_pwd = results[0].password;
                let passwordIsValid = bcrypt.compareSync(password, enc_pwd);
                if (passwordIsValid) {
                    ret_val.response = ReturnValues.SUCCESS;
                    ret_val.userID = results[0].id;
                }
                else {
                    ret_val.response = ReturnValues.NO_LOGIN;
                }
            }
            // If no username matches in the database
            else if (results.length == 0) {
                ret_val.response = ReturnValues.NO_LOGIN;
            }
            // If more than one user matches in the database. This should never happen
            else {
                ret_val.response = ReturnValues.INVALID_NUM_USERS;
            }
        }
        // If they try to use an auth strategy we haven't implemented yet. Just for safety sake
        else {
            ret_val.response = ReturnValues.INVALID_AUTH_STRATEGY;
        }
        return ret_val;
    });
}
exports.verify_login = verify_login;
function add_new_user(username, password, pronouns, auth = 'local') {
    return __awaiter(this, void 0, void 0, function* () {
        // Verify the username doesn't already exist. Exit if it does
        let num_users_with_name = (yield pool.query('SELECT ID FROM USERS WHERE NAME=$1', [username])).rowCount;
        if (num_users_with_name) {
            return ReturnValues.ERROR_USERS_EXISTS;
        }
        // Since the username doesn't already exist, add the user to the database and log error if issue
        let enc_pwd = yield bcrypt.hash(password, 5);
        let ret_val = ReturnValues.SUCCESS;
        try {
            let query_text = 'INSERT INTO USERS (NAME, PASSWORD, PRONOUNS, AUTH_TYPE) VALUES ($1, $2, $3, $4)';
            yield pool.query(query_text, [username, enc_pwd, pronouns, auth]);
        }
        catch (error) {
            console.log('ERROR! queries/users/auth/add_new_user postgres query failed for some reason');
            console.log('Error code: ', error);
            ret_val = ReturnValues.ERROR;
        }
        return ret_val;
    });
}
exports.add_new_user = add_new_user;
