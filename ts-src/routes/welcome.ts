import { Router } from "express";
import { welcomeController } from "../controllers/welcome"

const welcomeRouter: Router = Router();

welcomeRouter.get('/', welcomeController);

welcomeRouter.get('/welcome', welcomeController);

module.exports = welcomeRouter;
