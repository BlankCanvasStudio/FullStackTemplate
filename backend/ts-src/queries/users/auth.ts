const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const validation = require('../validation');

import { DeleteResponse, UserRoles } from './sets';

enum ReturnValues {
    SUCCESS = 0,
    ERROR = 1, 
    ERROR_USERS_EXISTS = 2, 
    INVALID_NUM_USERS = 4,
    NO_LOGIN = 5,
    INVALID_EMAIL = 6,
    INVALID_PASSWORD = 7,
    INVALID_PG_POOL = 8,
    NO_ROLE_EXISTS = 9,
    INVALID_USER_ID = 10,
    INVALID_ROLE = 12, 
    INVALID_NUM_MATCHES = 13,
}

type LoginValidationResponse = {
    response: ReturnValues, 
    userID: string,
    first_name:string,
    last_name:string,
};


async function verify_login(pool:typeof Pool, email:string, password:string): Promise<LoginValidationResponse> {
    // Default case is an error. Should always be change but just in case
    let ret_val:LoginValidationResponse = {
        response: ReturnValues.ERROR,
        userID: '',
        first_name:'',
        last_name:'',
    }

    // Validate the inputs
    if(!validation.pg_pool(pool)) { ret_val.response = ReturnValues.INVALID_PG_POOL; return ret_val }
    if (!validation.email(email)) { ret_val.response = ReturnValues.INVALID_EMAIL; return ret_val }
    if (!validation.password(password)) { ret_val.response = ReturnValues.INVALID_PASSWORD; return ret_val }

    // Get the hashed password for the given username
    let query_text = `
        SELECT 
            FIRST_NAME, LAST_NAME, ID, PASSWORD 
        FROM USERS 
        WHERE email=$1;`;
    let results:any[] = (await pool.query(query_text, [email])).rows

    if(results.length == 1) { 
        // If there is only a single user with that username, compare the hashed password with the given password and return result
        let enc_pwd:String = results[0].password
        let passwordIsValid:Boolean = bcrypt.compareSync(password, enc_pwd);
        if (passwordIsValid) { 
            ret_val.response = ReturnValues.SUCCESS;
            ret_val.userID = results[0].id;
            ret_val.first_name = results[0].first_name
            ret_val.last_name = results[0].last_name
        }
        else { ret_val.response = ReturnValues.NO_LOGIN; }
    }
    // If no username matches in the database
    else if (results.length == 0) { ret_val.response = ReturnValues.NO_LOGIN; }
    // If more than one user matches in the database. This should never happen
    else { ret_val.response = ReturnValues.INVALID_NUM_USERS; }

    return ret_val;
}

async function verify_admin(pool: typeof Pool, userID:string): Promise<ReturnValues> {
    if(!validation.pg_pool(pool)) { return ReturnValues.INVALID_PG_POOL; }
    if (!validation.UUID(userID)) { return ReturnValues.INVALID_USER_ID; }
    
    try {
        let query_text = `
            select NOT EXISTS 
                (
                    select ROLE 
                    FROM USERS
                    WHERE U_ID=$1 AND ROLE='ADMIN'
                );`

        let results = await pool.query(query_text, [userID])
        return results.rows[0]['?column?'] === false ? ReturnValues.SUCCESS : ReturnValues.ERROR;
    }
    catch(error) {
        console.log("ERROR! queries.users.auth.verifyEventAdmin")
        console.log(error)
        return ReturnValues.ERROR;
    }
}



export {
    ReturnValues, UserRoles, LoginValidationResponse,
    DeleteResponse,
    verify_login,
    verify_admin,
};
