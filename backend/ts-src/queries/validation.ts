const { Pool } = require('pg');
const empty_pool = new Pool({});

import { UserRoles } from './users/sets';


function username(username:string): Boolean {
    if(typeof username !== "string") { return false; }
    if(username.length > 50 || username.length === 0) { return false }
    return true;
}

function date(date_in:Date): Boolean {
    return typeof date_in.getMonth === 'function';
}

function pronouns(p_in:string): Boolean {
    if(typeof p_in !== "string") { return false; }
    if(p_in.length > 15) { return false }
    return true
}

function password(password:string): Boolean {
    if(typeof password !=="string") { return false }
    if(password.length > 60 || password.length === 0) { return false }
    return true;
}

function pg_pool(pool:typeof Pool): Boolean { return typeof empty_pool == typeof pool; }

function URL(url_in:string): Boolean {
    if (typeof url_in !== "string") { return false; }
    let regexp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    return regexp.test(url_in);
}

function UUID(UUID_in:string): Boolean {
    if (typeof UUID_in !== "string") { return false; }
    let regexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexp.test(UUID_in);
}

function phoneNumber(phone_in:string):Boolean {
    if (typeof phone_in !== 'string') { return false; }
    let regexp = /^\d{10}$/;    // 10 digit phone number regex
    return regexp.test(phone_in.trim().replace('-', ''))
}

function formatPhoneNumber(phone_in:string): Number { 
    return Number(phone_in.trim().replace('-', ''));
}

function email(email_in:string): Boolean {
    if(email_in.length > 320) { return false; }
    let regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regexp.test(email_in);
}

function user_role(role:string): Boolean { 
    if (typeof role !== "string") { return false; }
    return (role.toUpperCase() in UserRoles); 
}

type LocationEntry = {
    addressLineOne:string,
    addressLineTwo:string,
    city:string,
    state:string,
    zip:string,
};

function locationJSON(location:LocationEntry): Boolean{
    if (!(location.hasOwnProperty('addressLineOne') && location.hasOwnProperty('addressLineTwo') && 
            location.hasOwnProperty('city') && location.hasOwnProperty('state') && location.hasOwnProperty('zip'))) { return false; }
    return true;
}

function addressLineOne(line:string) {
    if (typeof line !== "string") { return false; }
    return true;
}

function addressLineTwo(line:string) {
    if (typeof line !== "string") { return false; }
    return true;
}

function city(line:string) {
    if (typeof line !== "string") { return false; }
    return true;
}

function state(line:string) {
    if (typeof line !== "string") { return false; }
    return true;
}

function zip(line:string) {
    if (typeof line !== "number" && !Number.isInteger(line)) { return false; }
    return true;
}

function text(line:string) {
    if (typeof line !== "string") { return false; }
    return true;
}

function str_to_int(str_in:string):any {
    if(str_in === undefined) { return undefined; }
    if(!str_in.length) { return undefined; }
    else {
        return Number(str_in);
    }
}

export {
    pg_pool,
    username, password, pronouns,
    date,
    URL,
    UUID,
    user_role,
    text,
    locationJSON,
    addressLineOne, addressLineTwo, city, state, zip,
    phoneNumber, formatPhoneNumber,
    email,
    str_to_int,
    LocationEntry,
}
