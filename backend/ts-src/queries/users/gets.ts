const { Pool, Client } = require('pg');
const validation = require('../validation');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

enum ReturnValues {
  SUCCESS = 0,
  ERROR = 1,
  INVALID_PG_POOL = 2,
  INVALID_USER_ID = 3,
}


async function query_plz() {
    console.log('hit the query_plz function');
}

async function user_roles(pool:typeof Pool): Promise<Array<string>> {
    let results = await pool.query(
                  `SELECT unnest(enum_range(NULL::COMMUNITY_ROLES))`);
    let ret_val:Array<string> = []
    for(let i=0; i<results.rows.length; i++) { 
        ret_val.push(results.rows[i].unnest); 
    }
    return ret_val;
}

type ProfileInfoReturn = {
    first_name:string,
    last_name:string, 
    pronouns:string,
    birthday:string,
    email:string, 
    addressLineOne:string,
    addressLineTwo:string,
    city:string,
    state:string,
    zip:number,
    status:ReturnValues,
}

async function retrieve_profile(pool: typeof Pool, userID:string): Promise<ProfileInfoReturn> {
  if (!validation.pg_pool(pool))     { 
    return {status:ReturnValues.INVALID_PG_POOL, pronouns:'', 
            birthday:'', email:'', first_name:'', last_name:'',
            addressLineOne:'', addressLineTwo:'', city:'', state:'',
            zip:0}; 
  }
  if (!validation.UUID(userID)) { 
    return {status:ReturnValues.INVALID_USER_ID, pronouns:'', 
            birthday:'', email:'', first_name:'', last_name:'',
            addressLineOne:'', addressLineTwo:'', city:'', state:'',
            zip:0}; 
  }

  try{
    // Dont' select all cause hashed passwords
    let query_text = `
        SELECT 
            FIRST_NAME, 
            LAST_NAME, 
            PRONOUNS, 
            to_char(BIRTHDAY, 'YYYY-MM-DD') as BIRTHDAY, 
            EMAIL,
            ADDRESSLINEONE,
            ADDRESSLINETWO,
            CITY,
            STATE,
            ZIP
        FROM USERS 
        WHERE ID=$1`;
    let results:any = await pool.query(query_text, [userID]);
    if(results.rowCount !== 1){ 
      return {status:ReturnValues.INVALID_USER_ID, pronouns:'', 
                birthday:'', email:'', first_name:'', last_name:'',
            addressLineOne:'', addressLineTwo:'', city:'', state:'',
            zip:0}; 
    }
    results.rows[0].status = ReturnValues.SUCCESS;
    return results.rows[0];
  }
  catch (error:any) {
    console.log('ERROR! queries.users.gets.retrieve_profile')
    console.log(error);
    return {status:ReturnValues.ERROR, pronouns:'', birthday:'', 
            email:'', first_name:'', last_name:'',
            addressLineOne:'', addressLineTwo:'', city:'', state:'',
            zip:0}; 
  }
}

export {
  ReturnValues,  
  query_plz, 
  user_roles,
  retrieve_profile, ProfileInfoReturn,
};
