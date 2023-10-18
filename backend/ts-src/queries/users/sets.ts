const validation = require('../validation');
import http = require('http');
import https = require('https');

const bcrypt = require('bcrypt');

const { Pool } = require('pg');

enum ReturnValues {
    SUCCESS = 0,
    ERROR = 1,
    ERROR_USERS_EXISTS = 2,
    INVALID_PASSWORD = 7,
    INVALID_PG_POOL = 8,
    INVALID_EMAIL = 9,
    INVALID_USER_UUID = 13,
    INVALID_PRONOUNS = 18,
    INVALID_BIRTHDAY = 19,
    INVALID_FIRST_NAME,
    INVALID_NUM_USERS_UPDATED,
    INVALID_LAST_NAME,
    INVALID_REPEATED_EMAIL,
    INVALID_LOCATION,
};

enum UserRoles {
    ADMIN = "ADMIN",
    USER = "USER", 
};


type AddNewUserResponse = {
    status: ReturnValues,
    userID:string,
    first_name:string,
    last_name:string,
}


type DeleteResponse = {
    response: ReturnValues, 
    num: number, 
};

const http_search_sever_mod_params = {
    host: process.env.HTTP_SEARCH_SERVER_HOST,
    port: 7700,
    path:'/indexes/users/documents',
    method:'POST',
    family:4,
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + process.env.SEARCH_USERS_MOD_TOKEN
    }
}
const https_search_sever_mod_params = {
    host: process.env.HTTPS_SEARCH_SERVER_HOST,
    port: 443,
    path:'/indexes/users/documents',
    method:'POST',
    family:4,
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + process.env.SEARCH_USERS_MOD_TOKEN
    }
}

async function add_new_user(pool:typeof Pool, email:string, birthday:Date, password:string, pronouns:string, first_name:string, last_name:string): Promise<AddNewUserResponse> {
    // Validate the inputs
    let ret_val:AddNewUserResponse = {
        status:ReturnValues.SUCCESS,
        userID:'',
        first_name:'',
        last_name:'',
    }
    if (!validation.pg_pool(pool)) { ret_val.status = ReturnValues.INVALID_PG_POOL; return ret_val; }
    if (!validation.email(email)) { ret_val.status = ReturnValues.INVALID_EMAIL; return ret_val; }
    if (!validation.password(password)) { ret_val.status = ReturnValues.INVALID_PASSWORD; return ret_val; }
    if (!validation.username(first_name)) { ret_val.status =  ReturnValues.INVALID_FIRST_NAME; return ret_val; }
    if (!validation.username(last_name)) { ret_val.status =  ReturnValues.INVALID_LAST_NAME; return ret_val; }
    if (pronouns && !validation.pronouns(pronouns)) { ret_val.status =  ReturnValues.INVALID_PRONOUNS; return ret_val; }
    if (birthday && !validation.date(birthday)) { ret_val.status =  ReturnValues.INVALID_BIRTHDAY; return ret_val; }

    // Since the username doesn't already exist, add the user to the database and log error if issue
    try {
        let enc_pwd = await bcrypt.hash(password, 5);
        let query_text:string = `
            INSERT INTO USERS (EMAIL, BIRTHDAY, PASSWORD, PRONOUNS, 
                                FIRST_NAME, LAST_NAME) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING ID`;
        let results = await pool.query(query_text, 
                        [email, birthday, enc_pwd, pronouns, 
                            first_name, last_name]);
        ret_val.userID = results.rows[0].id;

        update_search_engine(ret_val.userID, email, first_name, last_name)        
    }
    catch (error:any) {
        if(error.constraint === 'unique_user_email') { 
            ret_val.status = ReturnValues.INVALID_REPEATED_EMAIL; 
            return ret_val;
        }
        console.log('ERROR! queries.users.sets.add_new_user');
        console.log('Error code: ', error);
        ret_val.status = ReturnValues.ERROR;
    }
    return ret_val;
}


function OnResponse(response:any) {
    var data = '';
    response.on('data', function(chunk:string) {
        data += chunk; //Append each chunk of data received to this variable.
    });
    response.on('end', function() {
        // console.log(data); //Display the server's response, if any.
    });
}

function update_search_engine(userID:string, email:string, first_name:string, last_name:string) {
// Add the new user to the search enigne
    let new_user_data =  [ { 'id':userID, 'email':email, 'first_name':first_name, 'last_name':last_name } ]

    let request = http.request(http_search_sever_mod_params, OnResponse); // Make the req
    request.on('error', (error) => { 
        console.log('http error: ', error)
        let request = https.request(https_search_sever_mod_params, OnResponse); // Make the req
        request.on('error', (error) => { console.log('Event https connection failed while updating search engine in queries.users.add_new_user') })
        request.write(JSON.stringify(new_user_data));                        // Write the user data to the req
        request.end();
        })
    request.write(JSON.stringify(new_user_data));                        // Write the user data to the req
    request.end();
}


async function delete_by_UUID(pool:typeof Pool, UUID:string): Promise<DeleteResponse> {
    let ret_val:DeleteResponse = {
        num:-1,
        response: ReturnValues.ERROR
    }; 
    
    if (!validation.pg_pool(pool)) { ret_val.response = ReturnValues.INVALID_PG_POOL; return ret_val }
    if (!validation.UUID(UUID)) { ret_val.response = ReturnValues.INVALID_USER_UUID; return ret_val }

    try{
        let query_text = "DELETE FROM USERS WHERE ID = $1";
        let num_deleted:number = (await pool.query(query_text, [ UUID ])).rowCount;
        ret_val.num = num_deleted;
        ret_val.response = ReturnValues.SUCCESS;
    } catch (error) {
        console.log('ERROR! In queries.users.sets.delete_by_UUID')
        console.log(error);
        ret_val.num = -1;
        ret_val.response = ReturnValues.ERROR;
    }
    return ret_val;
}

async function update_profile(pool:typeof Pool, userID:string, first_name:string, last_name:string, pronouns:string, birthday:Date, email:string, addressLineOne:string, addressLineTwo:string, city:string, state:string, zip:number): Promise<ReturnValues> {
    if(birthday) { birthday = new Date(birthday); }
    if (!validation.pg_pool(pool)) { return ReturnValues.INVALID_PG_POOL; }
    if (!validation.UUID(userID)) { return ReturnValues.INVALID_USER_UUID; }
    if (!validation.email(email)) { return ReturnValues.INVALID_EMAIL; }
    if (first_name && !validation.username(first_name)) { return ReturnValues.INVALID_FIRST_NAME; }
    if (last_name && !validation.username(last_name)) { return ReturnValues.INVALID_LAST_NAME; }
    if (pronouns && !validation.pronouns(pronouns)) { return ReturnValues.INVALID_PRONOUNS; }
    if (birthday && !validation.date(birthday)) { return ReturnValues.INVALID_BIRTHDAY; }
    if (addressLineOne && !validation.addressLineOne(addressLineOne)) { return ReturnValues.INVALID_LOCATION; }
    if (addressLineTwo && !validation.addressLineTwo(addressLineTwo)) { return ReturnValues.INVALID_LOCATION; }
    if (city && !validation.city(city)) { return ReturnValues.INVALID_LOCATION }
    if (state && !validation.state(state)) { return ReturnValues.INVALID_LOCATION }
    if (zip && !validation.zip(zip)) { return ReturnValues.INVALID_LOCATION }
    
    try {
        let results;
        if (birthday) {
            let query_text = `UPDATE USERS
                              SET 
                              FIRST_NAME=$2,
                              LAST_NAME=$3,
                              PRONOUNS=$4,
                              BIRTHDAY=$5,
                              EMAIL = $6,
                              ADDRESSLINEONE=$7,
                              ADDRESSLINETWO=$8,
                              CITY=$9,
                              STATE=$10,
                              ZIP=$11
                              WHERE ID=$1`;
            results = (await pool.query(query_text, 
                            [userID, first_name, last_name, 
                                pronouns, birthday, email, 
                                addressLineOne, addressLineTwo, 
                                city, state, zip]));
        }
        else {
            let query_text = `UPDATE USERS
                              SET
                              FIRST_NAME=$2,
                              LAST_NAME=$3,
                              PRONOUNS=$4,
                              EMAIL = $5,
                              ADDRESSLINEONE=$6,
                              ADDRESSLINETWO=$7,
                              CITY=$8,
                              STATE=$9,
                              ZIP=$10
                              WHERE ID=$1`;
            results = (await pool.query(query_text, 
                            [userID, first_name, last_name, pronouns, 
                                email,addressLineOne, addressLineTwo, 
                                city, state, zip
                            ]));
        }
      
        if (results.rowCount === 0) { return ReturnValues.INVALID_USER_UUID; }
      
        update_search_engine(userID, email, first_name, last_name)  

        if (results.rowCount === 1) { return ReturnValues.SUCCESS; }
        else { return ReturnValues.INVALID_NUM_USERS_UPDATED }    // This should never hit
    } 
    catch(error:any) {
        console.log('ERROR! queries.users.sets.update_profile')
        console.log(error);
        return ReturnValues.ERROR;
    }
}

export {
    ReturnValues, UserRoles, AddNewUserResponse, DeleteResponse,
    delete_by_UUID,
    add_new_user,
    update_profile,
}
