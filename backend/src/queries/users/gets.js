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
exports.retrieve_profile = exports.user_roles = exports.query_plz = exports.ReturnValues = void 0;
const { Pool, Client } = require('pg');
const validation = require('../validation');
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});
var ReturnValues;
(function (ReturnValues) {
    ReturnValues[ReturnValues["SUCCESS"] = 0] = "SUCCESS";
    ReturnValues[ReturnValues["ERROR"] = 1] = "ERROR";
    ReturnValues[ReturnValues["INVALID_PG_POOL"] = 2] = "INVALID_PG_POOL";
    ReturnValues[ReturnValues["INVALID_USER_ID"] = 3] = "INVALID_USER_ID";
})(ReturnValues || (exports.ReturnValues = ReturnValues = {}));
function query_plz() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('hit the query_plz function');
    });
}
exports.query_plz = query_plz;
function user_roles(pool) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = yield pool.query(`SELECT unnest(enum_range(NULL::COMMUNITY_ROLES))`);
        let ret_val = [];
        for (let i = 0; i < results.rows.length; i++) {
            ret_val.push(results.rows[i].unnest);
        }
        return ret_val;
    });
}
exports.user_roles = user_roles;
function retrieve_profile(pool, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!validation.pg_pool(pool)) {
            return { status: ReturnValues.INVALID_PG_POOL, pronouns: '',
                birthday: '', email: '', first_name: '', last_name: '',
                addressLineOne: '', addressLineTwo: '', city: '', state: '',
                zip: 0 };
        }
        if (!validation.UUID(userID)) {
            return { status: ReturnValues.INVALID_USER_ID, pronouns: '',
                birthday: '', email: '', first_name: '', last_name: '',
                addressLineOne: '', addressLineTwo: '', city: '', state: '',
                zip: 0 };
        }
        try {
            // Dont' select all cause hashed passwords
            let query_text = `
        SELECT 
            FIRST_NAME, 
            LAST_NAME, 
            PRONOUNS, 
            to_char(BIRTHDAY, 'YYYY-MM-DD') as BIRTHDAY, 
            EMAIL,
            ADDRESSLINEONE,
            ADDRESSLINETWO,
            CITY,
            STATE,
            ZIP
        FROM USERS 
        WHERE ID=$1`;
            let results = yield pool.query(query_text, [userID]);
            if (results.rowCount !== 1) {
                return { status: ReturnValues.INVALID_USER_ID, pronouns: '',
                    birthday: '', email: '', first_name: '', last_name: '',
                    addressLineOne: '', addressLineTwo: '', city: '', state: '',
                    zip: 0 };
            }
            results.rows[0].status = ReturnValues.SUCCESS;
            return results.rows[0];
        }
        catch (error) {
            console.log('ERROR! queries.users.gets.retrieve_profile');
            console.log(error);
            return { status: ReturnValues.ERROR, pronouns: '', birthday: '',
                email: '', first_name: '', last_name: '',
                addressLineOne: '', addressLineTwo: '', city: '', state: '',
                zip: 0 };
        }
    });
}
exports.retrieve_profile = retrieve_profile;
