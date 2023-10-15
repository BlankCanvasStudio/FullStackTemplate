import { Response, Request } from "express";
const { Pool } = require('pg');
let userGets = require("../../queries/users/gets");
let userAuth = require("../../queries/users/auth");

import { ReturnValues, ProfileInfoReturn } from '../../queries/users/gets';

import { ReturnValues as AuthReturnValues } from '../../queries/users/auth';

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

async function userRoles(req:Request, res:Response) {
    try {
        let results = await userGets.user_roles(pool);
        res.status(200).send({roles: results});
    }
    catch (error) {
        console.log('users.gets.userRoles:\n', error);
        res.status(500).send({message:'Reason Unknown'})
    }
}

async function verifyAdmin(req:Request, res:Response) {
    try {
        let results = await userAuth.verify_admin(pool, req.body.userID);
        switch(results) {
            case AuthReturnValues.SUCCESS:
                res.status(200).send({admin: true});
                break;
            default:
                res.status(200).send({admin: false});
                break;
        }
    }
    catch (error) {
        console.log('users.gets.verifyAdmin:\n', error);
        res.status(500).send({message:'Reason Unknown'})
    }
}


async function retrieveProfile(req:Request, res:Response) {
    try {
        let results:ProfileInfoReturn = await userGets.retrieve_profile(pool, req.body.userID);
        switch(results.status) {
            case ReturnValues.INVALID_PG_POOL: 
                res.status(500).send({message: 'Invalid Pool'})
                break;
            case ReturnValues.INVALID_USER_ID:
                res.status(400).send({message:'Invalid User ID'});        // 
                break;
            case ReturnValues.SUCCESS: 
                res.status(200).send({data:results});        // Valid but no body
                break;
            //This case should never be hit
            case ReturnValues.ERROR:
            default:
                res.status(500).send({message: 'Reason Unknown'})
                break;
        }
    }
    catch (error) {
        console.log("ERROR! controllers.users.gets.retrieveProfile")
        console.log(error)
        res.status(500).json({
            message:"Unknown Critical Error Encountered. Please Contact Staff"
        });
    }
}

export {
    userRoles, verifyAdmin, retrieveProfile,
}
