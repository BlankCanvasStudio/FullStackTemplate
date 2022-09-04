import { Response, Request } from "express";
var jwt = require("jsonwebtoken");

let authStringLocation:string = process.env.appSrc + '/queries/users/auth'

let add_new_user:Function = require(authStringLocation).add_new_user;
let verify_login:Function = require(authStringLocation).verify_login;
let AuthReturnValues = require(authStringLocation).ReturnValues;


const authLogin = async (req:Request, res:Response): Promise<void> => {

    let login_result = await verify_login(req.body.username, req.body.password); // Figure out how to type login_result:AuthReturnValues
    switch(login_result.response) {
        
        case AuthReturnValues.SUCCESS: 
            let userID:string = login_result.userID;
            var token = jwt.sign({userID}, process.env.JWT_SECRET, {
                expiresIn:86400 // 24 hours
            });
            res.status(200).json({
                id:userID, 
                username:req.body.username, 
                accessToken: token
            });
            break;

        case AuthReturnValues.NO_LOGIN:
            res.status(401).json({
                accessToken:null,
                message: "Invalid Username or Password!"
            })
            break;

        case AuthReturnValues.INVALID_NUM_USERS:
            res.status(404).json({
                message:"Invalid Username."
            });
            break;

        case AuthReturnValues.INVALID_AUTH_STRATEGY:
            res.status(404).json({
                message:"Invalid Authentication Strategy"
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
        let result = await add_new_user(req.body.username, req.body.password, req.body.pronouns, 'local');
        if (result !== AuthReturnValues.SUCCESS) { res.status(500).send({signup:"fail"}); }
        else { res.status(201).send({signup:"success"}) }
    } catch (error) {
        throw error;
    }
};

export { authLogin, authSignUp };