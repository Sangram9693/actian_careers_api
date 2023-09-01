import { Request, Response } from 'express';
import ActianResponse from '../dto/actian.response';
import AppConst from '../lib/appconstants';
import ActianService from '../services/actian.service';
import { ActianServiceResp } from '../models/actian.model';
import Logger from "../lib/logger";

class ActianController {
    async getOperations(req: Request, res: Response) {
        const department: any = req.query.department;
        Logger.info(`getOperations(): department requested for ${department}`);

        let response = new ActianResponse();
        let status = 400;
        if(!department) {
            response.setStatus(status);
            response.setMessage(AppConst.REQUIRED);
            Logger.error(`getOperations():  ${AppConst.REQUIRED}`);
            return res.status(status).send(response);
        }

        const actianService: ActianService = new ActianService();
        await actianService.parseHtml()
        const result: ActianServiceResp = actianService.getOpenings(department);
        if(!result.data) {
            status = 200;
            Logger.warn(`getOperations(): ${AppConst.NOT_FOUND}`);
            response.setMessage(AppConst.NOT_FOUND);
        } else {
            status = 200;
            Logger.info(`getOperations(): ${AppConst.SUCCESS}`);
            response.setMessage(AppConst.SUCCESS);
            response.setData(result.data);
        }

        response.setStatus(status);
        Logger.info("getOperations(): response sent");
        return res.status(status).send(response);
    }
}

export default ActianController;