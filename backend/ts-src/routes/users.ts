import { Router } from "express";
import { verifyToken } from '../middleware/authJwt'

const usersRouter: Router = Router()

module.exports = usersRouter;
