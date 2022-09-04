"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// Define server constants
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
process.env.appRoot = path.join(__dirname, '..');
process.env.appSrc = path.join(__dirname);
require("dotenv").config();
// Set up app env
app.use(bodyParser.urlencoded({ extended: true })); // parsing middleware to make reqs easier to deal with
app.use(cookieParser(process.env.COOKIE_SECRET)); // Setting up the cookies
// Define all the routers
let welcomeRouter = require("./routes/welcome");
let errorRouter = require("./routes/errors");
let userRouter = require("./routes/users");
let authRouter = require("./routes/auth");
let homeRouter = require("./routes/home");
app.use(function (req, res, next) {
    // This allows front end server to post from a different URL and get responses
    res.header("Access-Control-Allow-Origin", "*");
    // This is set up for JWT
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
// Set up routers
app.use(welcomeRouter);
app.use(errorRouter);
app.use(userRouter);
app.use(authRouter);
app.use(homeRouter);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
