const bcrypt = require('bcrypt');
const { Pool, Client } = require('pg');
const LocalStrategy = require('passport-local').Strategy;

enum ReturnValues {
    SUCCESS = 0,
    ERROR = -1, 
    ERROR_USERS_EXISTS = 2, 
    INVALID_AUTH_STRATEGY = 3,
    INVALID_NUM_USERS = 4,
    NO_LOGIN = 5,
}

type LoginValidationResponse = {
    response: ReturnValues, 
    userID: string
};

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

pool.connect();


async function verify_login(username:string, password:string, auth:string='local'): Promise<LoginValidationResponse> {
    // Default case is an error. Should always be change but just in case
    let ret_val:LoginValidationResponse = {
        response: ReturnValues.ERROR,
        userID: '',
    }

    if(auth == 'local') {
        // Get the hashed password for the given username
        let query_text = "SELECT ID, PASSWORD FROM USERS WHERE name=$1;";
        let results:any[] = (await pool.query(query_text, [username])).rows
        
        if(results.length == 1) { 
            // If there is a single user with that username, compare the hashed password with the given password and return result
            let enc_pwd:String = results[0].password
            let passwordIsValid:Boolean = bcrypt.compareSync(password, enc_pwd);
            if (passwordIsValid) { 
                ret_val.response = ReturnValues.SUCCESS;
                ret_val.userID = results[0].id;
            }
            else { ret_val.response = ReturnValues.NO_LOGIN; }
            
        }
        // If no username matches in the database
        else if (results.length == 0) { ret_val.response = ReturnValues.NO_LOGIN; }
        // If more than one user matches in the database. This should never happen
        else { ret_val.response = ReturnValues.INVALID_NUM_USERS; }
    } 
    // If they try to use an auth strategy we haven't implemented yet. Just for safety sake
    else { ret_val.response = ReturnValues.INVALID_AUTH_STRATEGY; }

    return ret_val;
}


async function add_new_user(username:string, password:string, pronouns:string, auth:string='local'): Promise<ReturnValues> {
    // Verify the username doesn't already exist. Exit if it does
    let num_users_with_name:number = (await pool.query('SELECT ID FROM USERS WHERE NAME=$1', [username])).rowCount;
    if (num_users_with_name) { return ReturnValues.ERROR_USERS_EXISTS; }

    // Since the username doesn't already exist, add the user to the database and log error if issue
    let enc_pwd = await bcrypt.hash(password, 5);
    let ret_val:ReturnValues = ReturnValues.SUCCESS;
    
    try {
        let query_text:string = 'INSERT INTO USERS (NAME, PASSWORD, PRONOUNS, AUTH_TYPE) VALUES ($1, $2, $3, $4)';
        await pool.query(query_text, [username, enc_pwd, pronouns, auth]);
    }
    catch (error) {
        console.log('ERROR! queries/users/auth/add_new_user postgres query failed for some reason');
        console.log('Error code: ', error);
        ret_val = ReturnValues.ERROR;
    }

    return ret_val;
}

export {
    ReturnValues,
    verify_login, add_new_user
};
