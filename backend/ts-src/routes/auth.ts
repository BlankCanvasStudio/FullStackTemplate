import { Router } from "express";
import { verifyToken } from '../middleware/authJwt'

const loginController = require("../controllers/auth/login")
const adminController = require("../controllers/auth/admin")

const authRouter: Router = Router()

authRouter.post('/login', loginController.authLogin);

authRouter.post('/signup', loginController.authSignUp);

authRouter.post('/admin', 
    [ verifyToken ],
    adminController.authAdmin);

module.exports = authRouter;
