import { Router } from "express";
import { verifyToken } from '../middleware/authJwt'
import { query_plzController, userPronouns } from "../controllers/users/search"

const searchRouter: Router = Router()

searchRouter.get('/users/query_plz', query_plzController);

searchRouter.get('/users/:username/pronouns', 
    [ verifyToken ],
    userPronouns);

module.exports = searchRouter;