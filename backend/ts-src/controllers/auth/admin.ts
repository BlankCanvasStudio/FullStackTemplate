import { Response, Request, response } from "express";
var jwt = require("jsonwebtoken");
const authQueries = require('../../queries/users/auth');
import { ReturnValues } from '../../queries/users/auth'
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

pool.connect();



const authAdmin = async (req:Request, res:Response): Promise<void> => {
    try {
        let results = await authQueries.verify_admin(pool, req.body.userID);
        switch(results) {
            case ReturnValues.SUCCESS:
                res.status(200).send({admin: true});
                break;
            default:
                res.status(200).send({admin: false});
                break;
        }
    }
    catch (error) {
        console.log('auth.admin.authAdmin:\n', error);
        res.status(500).send({message:'Reason Unknown'})
    }
};

export { authAdmin };
