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
exports.update_profile = exports.add_new_user = exports.delete_by_UUID = exports.UserRoles = exports.ReturnValues = void 0;
const validation = require('../validation');
const http = require("http");
const https = require("https");
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
var ReturnValues;
(function (ReturnValues) {
    ReturnValues[ReturnValues["SUCCESS"] = 0] = "SUCCESS";
    ReturnValues[ReturnValues["ERROR"] = 1] = "ERROR";
    ReturnValues[ReturnValues["ERROR_USERS_EXISTS"] = 2] = "ERROR_USERS_EXISTS";
    ReturnValues[ReturnValues["INVALID_PASSWORD"] = 7] = "INVALID_PASSWORD";
    ReturnValues[ReturnValues["INVALID_PG_POOL"] = 8] = "INVALID_PG_POOL";
    ReturnValues[ReturnValues["INVALID_EMAIL"] = 9] = "INVALID_EMAIL";
    ReturnValues[ReturnValues["INVALID_USER_UUID"] = 13] = "INVALID_USER_UUID";
    ReturnValues[ReturnValues["INVALID_PRONOUNS"] = 18] = "INVALID_PRONOUNS";
    ReturnValues[ReturnValues["INVALID_BIRTHDAY"] = 19] = "INVALID_BIRTHDAY";
    ReturnValues[ReturnValues["INVALID_FIRST_NAME"] = 20] = "INVALID_FIRST_NAME";
    ReturnValues[ReturnValues["INVALID_NUM_USERS_UPDATED"] = 21] = "INVALID_NUM_USERS_UPDATED";
    ReturnValues[ReturnValues["INVALID_LAST_NAME"] = 22] = "INVALID_LAST_NAME";
    ReturnValues[ReturnValues["INVALID_REPEATED_EMAIL"] = 23] = "INVALID_REPEATED_EMAIL";
})(ReturnValues || (exports.ReturnValues = ReturnValues = {}));
;
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["USER"] = "USER";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
;
const http_search_sever_mod_params = {
    host: process.env.HTTP_SEARCH_SERVER_HOST,
    port: 7700,
    path: '/indexes/users/documents',
    method: 'POST',
    family: 4,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.SEARCH_USERS_MOD_TOKEN
    }
};
const https_search_sever_mod_params = {
    host: process.env.HTTPS_SEARCH_SERVER_HOST,
    port: 443,
    path: '/indexes/users/documents',
    method: 'POST',
    family: 4,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.SEARCH_USERS_MOD_TOKEN
    }
};
function add_new_user(pool, email, birthday, password, pronouns, first_name, last_name) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate the inputs
        let ret_val = {
            status: ReturnValues.SUCCESS,
            userID: '',
            first_name: '',
            last_name: '',
        };
        if (!validation.pg_pool(pool)) {
            ret_val.status = ReturnValues.INVALID_PG_POOL;
            return ret_val;
        }
        if (!validation.email(email)) {
            ret_val.status = ReturnValues.INVALID_EMAIL;
            return ret_val;
        }
        if (!validation.password(password)) {
            ret_val.status = ReturnValues.INVALID_PASSWORD;
            return ret_val;
        }
        if (!validation.username(first_name)) {
            ret_val.status = ReturnValues.INVALID_FIRST_NAME;
            return ret_val;
        }
        if (!validation.username(last_name)) {
            ret_val.status = ReturnValues.INVALID_LAST_NAME;
            return ret_val;
        }
        if (pronouns && !validation.pronouns(pronouns)) {
            ret_val.status = ReturnValues.INVALID_PRONOUNS;
            return ret_val;
        }
        if (birthday && !validation.date(birthday)) {
            ret_val.status = ReturnValues.INVALID_BIRTHDAY;
            return ret_val;
        }
        // Since the username doesn't already exist, add the user to the database and log error if issue
        try {
            let enc_pwd = yield bcrypt.hash(password, 5);
            let query_text = `
            INSERT INTO USERS (EMAIL, BIRTHDAY, PASSWORD, PRONOUNS, 
                                FIRST_NAME, LAST_NAME) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING ID`;
            let results = yield pool.query(query_text, [email, birthday, enc_pwd, pronouns,
                first_name, last_name]);
            ret_val.userID = results.rows[0].id;
            update_search_engine(ret_val.userID, email, first_name, last_name);
        }
        catch (error) {
            if (error.constraint === 'unique_user_email') {
                ret_val.status = ReturnValues.INVALID_REPEATED_EMAIL;
                return ret_val;
            }
            console.log('ERROR! queries.users.sets.add_new_user');
            console.log('Error code: ', error);
            ret_val.status = ReturnValues.ERROR;
        }
        return ret_val;
    });
}
exports.add_new_user = add_new_user;
function OnResponse(response) {
    var data = '';
    response.on('data', function (chunk) {
        data += chunk; //Append each chunk of data received to this variable.
    });
    response.on('end', function () {
        // console.log(data); //Display the server's response, if any.
    });
}
function update_search_engine(userID, email, first_name, last_name) {
    // Add the new user to the search enigne
    let new_user_data = [{ 'id': userID, 'email': email, 'first_name': first_name, 'last_name': last_name }];
    let request = http.request(http_search_sever_mod_params, OnResponse); // Make the req
    request.on('error', (error) => {
        console.log('http error: ', error);
        let request = https.request(https_search_sever_mod_params, OnResponse); // Make the req
        request.on('error', (error) => { console.log('Event https connection failed while updating search engine in queries.users.add_new_user'); });
        request.write(JSON.stringify(new_user_data)); // Write the user data to the req
        request.end();
    });
    request.write(JSON.stringify(new_user_data)); // Write the user data to the req
    request.end();
}
function delete_by_UUID(pool, UUID) {
    return __awaiter(this, void 0, void 0, function* () {
        let ret_val = {
            num: -1,
            response: ReturnValues.ERROR
        };
        if (!validation.pg_pool(pool)) {
            ret_val.response = ReturnValues.INVALID_PG_POOL;
            return ret_val;
        }
        if (!validation.UUID(UUID)) {
            ret_val.response = ReturnValues.INVALID_USER_UUID;
            return ret_val;
        }
        try {
            let query_text = "DELETE FROM USERS WHERE ID = $1";
            let num_deleted = (yield pool.query(query_text, [UUID])).rowCount;
            ret_val.num = num_deleted;
            ret_val.response = ReturnValues.SUCCESS;
        }
        catch (error) {
            console.log('ERROR! In queries.users.sets.delete_by_UUID');
            console.log(error);
            ret_val.num = -1;
            ret_val.response = ReturnValues.ERROR;
        }
        return ret_val;
    });
}
exports.delete_by_UUID = delete_by_UUID;
function update_profile(pool, userID, first_name, last_name, pronouns, birthday, email) {
    return __awaiter(this, void 0, void 0, function* () {
        if (birthday) {
            birthday = new Date(birthday);
        }
        if (!validation.pg_pool(pool)) {
            return ReturnValues.INVALID_PG_POOL;
        }
        if (!validation.UUID(userID)) {
            return ReturnValues.INVALID_USER_UUID;
        }
        if (!validation.email(email)) {
            return ReturnValues.INVALID_EMAIL;
        }
        if (first_name && !validation.username(first_name)) {
            return ReturnValues.INVALID_FIRST_NAME;
        }
        if (last_name && !validation.username(last_name)) {
            return ReturnValues.INVALID_LAST_NAME;
        }
        if (pronouns && !validation.pronouns(pronouns)) {
            return ReturnValues.INVALID_PRONOUNS;
        }
        if (birthday && !validation.date(birthday)) {
            return ReturnValues.INVALID_BIRTHDAY;
        }
        try {
            let results;
            if (birthday) {
                let query_text = `UPDATE USERS
                              SET 
                              FIRST_NAME=$2,
                              LAST_NAME=$3,
                              PRONOUNS=$4,
                              BIRTHDAY=$5,
                              EMAIL = $6,
                              WHERE ID=$1`;
                results = (yield pool.query(query_text, [userID, first_name, last_name,
                    pronouns, birthday, email]));
            }
            else {
                let query_text = "UPDATE USERS \
                              SET USERNAME=$2, \
                              FIRST_NAME=$3, \
                              LAST_NAME=$4, \
                              PRONOUNS=$5, \
                              EMAIL = $6, \
                              BIO = $7 \
                              WHERE ID=$1";
                results = (yield pool.query(query_text, [userID, first_name, last_name, pronouns,
                    email]));
            }
            if (results.rowCount === 0) {
                return ReturnValues.INVALID_USER_UUID;
            }
            update_search_engine(userID, email, first_name, last_name);
            if (results.rowCount === 1) {
                return ReturnValues.SUCCESS;
            }
            else {
                return ReturnValues.INVALID_NUM_USERS_UPDATED;
            } // This should never hit
        }
        catch (error) {
            console.log('ERROR! queries.users.sets.update_profile');
            console.log(error);
            return ReturnValues.ERROR;
        }
    });
}
exports.update_profile = update_profile;
