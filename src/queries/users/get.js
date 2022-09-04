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
exports.user_pronouns = exports.query_plz = void 0;
const { Pool, Client } = require('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});
function query_plz() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        yield client.query('BEGIN');
        let results = (yield client.query('SELECT * FROM USERS')).rowCount;
        console.log(results);
    });
}
exports.query_plz = query_plz;
function user_pronouns(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = yield pool.query('SELECT PRONOUNS FROM USERS WHERE NAME=$1', [username]);
        if (results.rowCount == 0) {
            return '';
        }
        return results.rows[0].pronouns;
    });
}
exports.user_pronouns = user_pronouns;
