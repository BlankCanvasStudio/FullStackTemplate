// import { runInNewContext } from "vm";

const jwt = require("jsonwebtoken");
const authUsersQueries = require("../queries/users/auth");
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

let findOptionalToken = (req:any, res:any, next:any) => {
  let token = req.headers[ "x-access-token" ];
  if (!token) {
    next();
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (err:any, decoded:any) => {
    if (err) {
      next();
      return;
    }
    req.body.userID = decoded.userID;
    next();
  });
};


let verifyToken = (req:any, res:any, next:any) => {
  let token = req.headers[ "x-access-token" ];
  if (!token) {
    return res.status(401).send({
      message: "Unauthorized!"
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err:any, decoded:any) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.body.userID = decoded.userID;
    next();
  });
};

let verifyAdmin = (req:any, res:any, next:any) => {
  let userID = req.body.userID;   // This should be set in verifyToken
  authUsersQueries.verify_admin(pool, userID).then((results:Number)=>{
    if ( results === authUsersQueries.ReturnValues.SUCCESS) {
      next();
    }
    else {    
      // One could add better redirects here but I won't for now cause this is the auth system. 
        // As little info as possible ig
      return res.status(401).send({
        message: "Unauthorized!"
      });
  }});
}

let verifySameUser = (req:any, res:any, next:any) => {
  let userID_params = req.params.userID;
  let userID_body = req.body.userID;   // This should be set in verifyToken
  if (userID_params !== userID_body) {
    return res.status(401).send({
      message: "Unauthorized!"
    });
  }
  else {
    next();
  }
}

export { 
  verifyToken, findOptionalToken,
  verifyAdmin, 
  verifySameUser,
};
