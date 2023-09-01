import express, { Router, NextFunction, Request, Response } from 'express';
import ActianController from '../controllers/actian.controller';
import Logger from "../lib/logger";
import AppConst from '../lib/appconstants';

const router: Router = express.Router();

router.get('/', new ActianController().getOperations);

router.use((err: Error, _: Request, res: Response, _1: NextFunction) => {
    Logger.error(err.message);
    res.status(500).send(AppConst.ERROR);
});

export default router;