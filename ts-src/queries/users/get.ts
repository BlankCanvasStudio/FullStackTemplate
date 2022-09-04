const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});



async function query_plz() {
    const client = await pool.connect();
    await client.query('BEGIN');
    let results = (await client.query('SELECT * FROM USERS')).rowCount;
    console.log(results);
}

async function user_pronouns(username: string): Promise<string> {
  let results = await pool.query('SELECT PRONOUNS FROM USERS WHERE NAME=$1', [username]);
  if(results.rowCount == 0){ return ''; }
  return results.rows[0].pronouns
}

export {
    query_plz, 
    user_pronouns
};
