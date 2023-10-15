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
exports.updateProfile = void 0;
const { Pool } = require('pg');
let userSets = require('../../queries/users/sets');
const sets_1 = require("../../queries/users/sets");
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let results = yield userSets.update_profile(pool, req.body.userID, req.body.username, req.body.first_name, req.body.last_name, req.body.pronouns, req.body.birthday, req.body.email, req.body.bio, req.body.linkTreeEntries);
            switch (results) {
                case sets_1.ReturnValues.SUCCESS:
                    res.status(204).send({ message: "Success!" }); // Valid but no body
                    break;
                case sets_1.ReturnValues.INVALID_PG_POOL:
                    res.status(500).send({ message: 'Invalid Pool' });
                    break;
                case sets_1.ReturnValues.INVALID_USER_UUID:
                    res.status(400).send({ message: 'Invalid UserID' }); // 
                    break;
                case sets_1.ReturnValues.INVALID_FIRST_NAME:
                    res.status(400).send({ message: 'Invalid First Name' }); // 
                    break;
                case sets_1.ReturnValues.INVALID_LAST_NAME:
                    res.status(400).send({ message: 'Invalid Last Name' }); // 
                    break;
                case sets_1.ReturnValues.INVALID_PRONOUNS:
                    res.status(400).send({ message: 'Invalid Pronouns' }); // 
                    break;
                case sets_1.ReturnValues.INVALID_BIRTHDAY:
                    res.status(400).send({ message: 'Invalid Birthday' }); // 
                    break;
                case sets_1.ReturnValues.INVALID_EMAIL:
                    res.status(400).send({ message: 'Invalid Email' }); // 
                    break;
                //This case should never be hit
                case sets_1.ReturnValues.ERROR:
                default:
                    res.status(500).send({ message: 'Reason Unknown' });
                    break;
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Unknown Critical Error Encountered. Please Contact Staff"
            });
            throw error;
        }
    });
}
exports.updateProfile = updateProfile;
