"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str_to_int = exports.email = exports.formatPhoneNumber = exports.phoneNumber = exports.zip = exports.state = exports.city = exports.addressLineTwo = exports.addressLineOne = exports.locationJSON = exports.text = exports.user_role = exports.UUID = exports.URL = exports.date = exports.pronouns = exports.password = exports.username = exports.pg_pool = void 0;
const { Pool } = require('pg');
const empty_pool = new Pool({});
const sets_1 = require("./users/sets");
function username(username) {
    if (typeof username !== "string") {
        return false;
    }
    if (username.length > 50 || username.length === 0) {
        return false;
    }
    return true;
}
exports.username = username;
function date(date_in) {
    return typeof date_in.getMonth === 'function';
}
exports.date = date;
function pronouns(p_in) {
    if (typeof p_in !== "string") {
        return false;
    }
    if (p_in.length > 15) {
        return false;
    }
    return true;
}
exports.pronouns = pronouns;
function password(password) {
    if (typeof password !== "string") {
        return false;
    }
    if (password.length > 60 || password.length === 0) {
        return false;
    }
    return true;
}
exports.password = password;
function pg_pool(pool) { return typeof empty_pool == typeof pool; }
exports.pg_pool = pg_pool;
function URL(url_in) {
    if (typeof url_in !== "string") {
        return false;
    }
    let regexp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    return regexp.test(url_in);
}
exports.URL = URL;
function UUID(UUID_in) {
    if (typeof UUID_in !== "string") {
        return false;
    }
    let regexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexp.test(UUID_in);
}
exports.UUID = UUID;
function phoneNumber(phone_in) {
    if (typeof phone_in !== 'string') {
        return false;
    }
    let regexp = /^\d{10}$/; // 10 digit phone number regex
    return regexp.test(phone_in.trim().replace('-', ''));
}
exports.phoneNumber = phoneNumber;
function formatPhoneNumber(phone_in) {
    return Number(phone_in.trim().replace('-', ''));
}
exports.formatPhoneNumber = formatPhoneNumber;
function email(email_in) {
    if (email_in.length > 320) {
        return false;
    }
    let regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regexp.test(email_in);
}
exports.email = email;
function user_role(role) {
    if (typeof role !== "string") {
        return false;
    }
    return (role.toUpperCase() in sets_1.UserRoles);
}
exports.user_role = user_role;
function locationJSON(location) {
    if (!(location.hasOwnProperty('addressLineOne') && location.hasOwnProperty('addressLineTwo') &&
        location.hasOwnProperty('city') && location.hasOwnProperty('state') && location.hasOwnProperty('zip'))) {
        return false;
    }
    return true;
}
exports.locationJSON = locationJSON;
function addressLineOne(line) {
    if (typeof line !== "string") {
        return false;
    }
    return true;
}
exports.addressLineOne = addressLineOne;
function addressLineTwo(line) {
    if (typeof line !== "string") {
        return false;
    }
    return true;
}
exports.addressLineTwo = addressLineTwo;
function city(line) {
    if (typeof line !== "string") {
        return false;
    }
    return true;
}
exports.city = city;
function state(line) {
    if (typeof line !== "string") {
        return false;
    }
    return true;
}
exports.state = state;
function zip(line) {
    if (typeof line !== "number" && !Number.isInteger(line)) {
        return false;
    }
    return true;
}
exports.zip = zip;
function text(line) {
    if (typeof line !== "string") {
        return false;
    }
    return true;
}
exports.text = text;
function str_to_int(str_in) {
    if (str_in === undefined) {
        return undefined;
    }
    if (!str_in.length) {
        return undefined;
    }
    else {
        return Number(str_in);
    }
}
exports.str_to_int = str_to_int;
