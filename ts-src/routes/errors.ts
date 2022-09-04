import { Router } from "express";
import { errorPage } from "../controllers/errors"

const errorRouter: Router = Router()

errorRouter.get('/loading-error', errorPage);

module.exports = errorRouter;