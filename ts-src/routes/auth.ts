import { Router } from "express";
import { authLogin, authSignUp } from "../controllers/auth/login"

const authRouter: Router = Router()

authRouter.post('/login', authLogin);

authRouter.post('/signup', authSignUp);

module.exports = authRouter;