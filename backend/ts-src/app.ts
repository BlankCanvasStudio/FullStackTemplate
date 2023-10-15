import express, { Express } from "express";
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Define server constants
const PORT: string | number = process.env.PORT || 4000
const app: Express = express()

process.env.appRoot = path.join(__dirname, '..');
process.env.appSrc = path.join(__dirname);


require("dotenv").config();


// Setting up CORS
let cors_options = {
  origin:'*',
  methods:'GET,POST,OPTIONS',
  credentials:true,
  optionsSuccessStatus:204,
  "preflightContinue":false,
  allowHeaders:['Content-Type', 'Origin',  'x-access-token', 'Accept'],
}

app.use(function(req, res, next) {
  // Comments are helpful for debugging packets
  // console.log(req.method);
  // console.log(req.headers);
  next();
  // console.log(res.getHeaders());
  // console.log('------------------\n\n\n\n');
}, cors(cors_options));

app.options('*', cors(cors_options));


// Set up app env
app.use(bodyParser.urlencoded({ extended: true }));      // parsing middleware to make reqs easier to deal with
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET))    // Setting up the cookies


app.use(function(req, res, next) {
    // This allows front end server to post from a different URL and get responses
    res.header("Access-Control-Allow-Origin", "*");     
    // This is set up for JWT
    res.header(        
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();

});


// Define all the routers
let welcomeRouter = require("./routes/welcome");
let errorRouter = require("./routes/errors");
let userRouter = require("./routes/users");
let authRouter = require("./routes/auth");
let homeRouter = require("./routes/home");


// Set up routers
app.use('/api/static', express.static(path.join(process.env.appRoot, './static')))
app.use('/api/welcome', welcomeRouter);
app.use('/api/error', errorRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/home', homeRouter);

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
});
