import { Response, Request } from "express";
const { Pool } = require('pg');

let userSets = require('../../queries/users/sets');
import { ReturnValues, DeleteResponse } from '../../queries/users/sets';

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

async function updateProfile(req:Request, res:Response) {
    try {
        let results: ReturnValues = await userSets.update_profile(pool, req.body.userID, req.body.first_name, req.body.last_name, req.body.pronouns, req.body.birthday, req.body.email, req.body.addressLineOne, req.body.addressLineTwo, req.body.city, req.body.state, parseInt(req.body.zip));
        switch(results) {
            case ReturnValues.SUCCESS: 
                res.status(204).send({message:"Success!"});        // Valid but no body
                break;
            case ReturnValues.INVALID_PG_POOL: 
                res.status(500).send({message: 'Invalid Pool'})
                break;
            case ReturnValues.INVALID_USER_UUID:
                res.status(400).send({message:'Invalid UserID'});        // 
                break;
            case ReturnValues.INVALID_FIRST_NAME:
                res.status(400).send({message:'Invalid First Name'});        // 
                break;
            case ReturnValues.INVALID_LAST_NAME:
                res.status(400).send({message:'Invalid Last Name'});        // 
                break;
            case ReturnValues.INVALID_PRONOUNS:
                res.status(400).send({message:'Invalid Pronouns'});        // 
                break;
            case ReturnValues.INVALID_BIRTHDAY:
                res.status(400).send({message:'Invalid Birthday'});        // 
                break;
            case ReturnValues.INVALID_EMAIL:
                res.status(400).send({message:'Invalid Email'});        // 
                break;
            //This case should never be hit
            case ReturnValues.ERROR:
            default:
                res.status(500).send({message: 'Reason Unknown'})
                break;
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message:"Unknown Critical Error Encountered. Please Contact Staff"
        });
        throw error;
    }
}


export {
    updateProfile,
};
