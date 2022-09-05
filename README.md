# Full-Stack Template
Welcome to my full-stack template!

The stack is nginx are a reverse proxy in front of a typescript, node, and express backend server, a postgres database, and a react front end. The backend server is run at the subdomain backend.localhost, while the frontend server is accessable through localhost:80 and localhost:3000 by default.


# Configuration
To configure the server run ./build.sh to download all the dependencies and start nginx. The database can be configured by running ./database/init/init-db.sh, buil-db.sh, and populate-db.sh in that order (see the build scripts to see how each works).


# Running
The react front end is run with 'npm start' in the client folder. 
The backend server is run with 'npm run start' which compiles and executes the typescript server. This typescript code lives in ts-src and is compiled into the src folder.


# Implementation Details
After you have set up the server, it will be configured to run a login page, a signup page, a profile page, and a few query routes in the backend. Authentication is set up by default as well. 

Authentication is done in the backend with JWT and the react frontend is configured to add the JWT to the header when requesting information from the backend (see ./client/src/pages/profile/index.js for an example). In the backend ./ts-src/middleware/authJWT contains the middleware function used for authentication (see ./ts-src/routes/users for an example). Users are authenticated on login and are issues a token which works for 24hrs.

The rest of the website now just needs to be built around this framework.

Have fun!