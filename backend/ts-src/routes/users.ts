import { Router } from "express";
import { verifyToken, verifyAdmin } from '../middleware/authJwt'

let userGets = require('../controllers/users/gets')
let userSets = require('../controllers/users/sets')

const usersRouter: Router = Router()

usersRouter.get('/profile/info', 
    [ verifyToken ],
    userGets.retrieveProfile);

usersRouter.post('/profile/update',
    [ verifyToken ],
    userSets.updateProfile);

usersRouter.post('/profile/view/:userID', 
    [ verifyToken, verifyAdmin ],
    userGets.viewProfile);

module.exports = usersRouter;
