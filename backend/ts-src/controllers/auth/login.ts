import { Response, Request, response } from "express";
var jwt = require("jsonwebtoken");
const authQueries = require('../../queries/users/auth');
const userSetsQueries = require('../../queries/users/sets');
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

pool.connect();


let authStringLocation:string = process.env.appSrc + '/queries/users/auth'

let AuthReturnValues = require(authStringLocation).ReturnValues;


const authLogin = async (req:Request, res:Response): Promise<void> => {

    let login_result = await authQueries.verify_login(pool, req.body.username, req.body.password);
    switch(login_result.response) {
        case AuthReturnValues.SUCCESS: 
            let userID:string = login_result.userID;
            var token = jwt.sign({userID}, process.env.JWT_SECRET, {
                expiresIn:process.env.JWT_LIFETIME
            });
            res.status(200).json({
                id:userID, 
                first_name:login_result.first_name,
                last_name:login_result.last_name,
                accessToken: token,
            });
            break;
        
        case authQueries.ReturnValues.INVALID_PG_POOL:
            res.status(500).send({message: 'Invalid Pool'})
            break;

        case authQueries.ReturnValues.INVALID_USERNAME: 
            res.status(404).send({message: 'Invalid Username or Password!'}); 
            break;

        case authQueries.ReturnValues.INVALID_PASSWORD: 
            res.status(404).send({message: 'Invalid Username or Password!'}); 
            break;

        case AuthReturnValues.NO_LOGIN:
            res.status(401).json({
                accessToken:null,
                message: "Invalid Username or Password!"
            })
            break;

        case AuthReturnValues.INVALID_NUM_USERS:
            res.status(404).json({
                message:"Invalid Username or Password!"
            });
            break;
       
        default:
        case AuthReturnValues.ERROR:
            res.status(500).json({
                message:"Unknown Critical Error Encountered. Please Contact Staff"
            });
            break;
    }
};

const authSignUp = async (req:Request, res:Response): Promise<void> => {
    try {
        let result = await userSetsQueries.add_new_user(pool, req.body.email, req.body.birthday.length ? new Date(req.body.birthday) : undefined, req.body.password, req.body.pronouns, req.body.first_name, req.body.last_name);
        switch (result.status) {
            case authQueries.ReturnValues.SUCCESS:
                let userID:string = result.userID;
                var token = jwt.sign({userID}, process.env.JWT_SECRET, {
                    expiresIn:process.env.JWT_LIFETIME
                });
                res.status(200).json({
                    id:userID, 
                    first_name:req.body.first_name, 
                    last_name:req.body.last_name, 
                    accessToken: token,
                    message:"Success!"
                });
                break;

            case userSetsQueries.ReturnValues.INVALID_PG_POOL:
                res.status(500).send({message: 'Invalid Pool'})
                break;
            
            case userSetsQueries.ReturnValues.INVALID_EMAIL:
                res.status(500).send({message: 'Invalid Email'})
                break;
            
            case userSetsQueries.ReturnValues.INVALID_REPEATED_EMAIL:
                res.status(500).send({message: 'Email already in use'})
                break;

            case userSetsQueries.ReturnValues.ERROR_USERS_EXISTS: 
            case userSetsQueries.ReturnValues.INVALID_USERNAME: 
                res.status(404).send({message: 'Invalid Username'}); 
                break;

            case userSetsQueries.ReturnValues.INVALID_PASSWORD: 
                res.status(400).send({message: 'Invalid Password'})
                break;
               
            default:
            case userSetsQueries.ReturnValues.ERROR: 
                res.status(500).send({message: 'Reason Unknown'})
                break;
            
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Unknown Critical Error Encountered. Please Contact Staff"})
        throw error;
    }
};

export { authLogin, authSignUp };
