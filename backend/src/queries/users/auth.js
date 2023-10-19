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
exports.verify_admin = exports.verify_login = exports.UserRoles = exports.ReturnValues = void 0;
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const validation = require('../validation');
const sets_1 = require("./sets");
Object.defineProperty(exports, "UserRoles", { enumerable: true, get: function () { return sets_1.UserRoles; } });
var ReturnValues;
(function (ReturnValues) {
    ReturnValues[ReturnValues["SUCCESS"] = 0] = "SUCCESS";
    ReturnValues[ReturnValues["ERROR"] = 1] = "ERROR";
    ReturnValues[ReturnValues["ERROR_USERS_EXISTS"] = 2] = "ERROR_USERS_EXISTS";
    ReturnValues[ReturnValues["INVALID_NUM_USERS"] = 4] = "INVALID_NUM_USERS";
    ReturnValues[ReturnValues["NO_LOGIN"] = 5] = "NO_LOGIN";
    ReturnValues[ReturnValues["INVALID_EMAIL"] = 6] = "INVALID_EMAIL";
    ReturnValues[ReturnValues["INVALID_PASSWORD"] = 7] = "INVALID_PASSWORD";
    ReturnValues[ReturnValues["INVALID_PG_POOL"] = 8] = "INVALID_PG_POOL";
    ReturnValues[ReturnValues["NO_ROLE_EXISTS"] = 9] = "NO_ROLE_EXISTS";
    ReturnValues[ReturnValues["INVALID_USER_ID"] = 10] = "INVALID_USER_ID";
    ReturnValues[ReturnValues["INVALID_ROLE"] = 12] = "INVALID_ROLE";
    ReturnValues[ReturnValues["INVALID_NUM_MATCHES"] = 13] = "INVALID_NUM_MATCHES";
})(ReturnValues || (exports.ReturnValues = ReturnValues = {}));
function verify_login(pool, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Default case is an error. Should always be change but just in case
        let ret_val = {
            response: ReturnValues.ERROR,
            userID: '',
            first_name: '',
            last_name: '',
        };
        // Validate the inputs
        if (!validation.pg_pool(pool)) {
            ret_val.response = ReturnValues.INVALID_PG_POOL;
            return ret_val;
        }
        if (!validation.email(email)) {
            ret_val.response = ReturnValues.INVALID_EMAIL;
            return ret_val;
        }
        if (!validation.password(password)) {
            ret_val.response = ReturnValues.INVALID_PASSWORD;
            return ret_val;
        }
        // Get the hashed password for the given username
        let query_text = `
        SELECT 
            FIRST_NAME, LAST_NAME, ID, PASSWORD 
        FROM USERS 
        WHERE email=$1;`;
        let results = (yield pool.query(query_text, [email])).rows;
        if (results.length == 1) {
            // If there is only a single user with that username, compare the hashed password with the given password and return result
            let enc_pwd = results[0].password;
            let passwordIsValid = bcrypt.compareSync(password, enc_pwd);
            if (passwordIsValid) {
                ret_val.response = ReturnValues.SUCCESS;
                ret_val.userID = results[0].id;
                ret_val.first_name = results[0].first_name;
                ret_val.last_name = results[0].last_name;
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
        return ret_val;
    });
}
exports.verify_login = verify_login;
function verify_admin(pool, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!validation.pg_pool(pool)) {
            return ReturnValues.INVALID_PG_POOL;
        }
        if (!validation.UUID(userID)) {
            return ReturnValues.INVALID_USER_ID;
        }
        try {
            let query_text = `
            select NOT EXISTS 
                (
                    select ROLE 
                    FROM USERS
                    WHERE ID=$1 AND ROLE='ADMIN'
                );`;
            let results = yield pool.query(query_text, [userID]);
            return results.rows[0]['?column?'] === false ? ReturnValues.SUCCESS : ReturnValues.ERROR;
        }
        catch (error) {
            console.log("ERROR! queries.users.auth.verifyAdmin");
            console.log(error);
            return ReturnValues.ERROR;
        }
    });
}
exports.verify_admin = verify_admin;
