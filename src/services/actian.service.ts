import { ActianServiceResp, Job, DepartmentJob, DepartmentJobUndefined } from '../models/actian.model';
import AppConst from '../lib/appconstants';
import NodeCache from 'node-cache';
import axios from 'axios';
import * as cheerio from 'cheerio';
import Logger from "../lib/logger";

const cache = new NodeCache();

class ActianService {
    getOpenings(department: string): ActianServiceResp {
        Logger.info(`getOpenings(): class start`);
        const result: ActianServiceResp = {
            message: AppConst.NOT_FOUND,
            data: undefined,
        };

        const data = this.getJob(department);
        if(data) {
            Logger.info(`getOpenings(): getting data from cache`);
            result.data = data;
            result.message = AppConst.SUCCESS;
        }

        return result;
    }

    getJob(department: string): DepartmentJobUndefined {
        Logger.info(`getJob(): filter data by department ${department}`);
        let actianJobList: DepartmentJob[] = cache.get(AppConst.KEY) ?? [];
        return actianJobList.find((job) => job.department === department);
    }

    async parseHtml(): Promise<void> {
        Logger.info(`parseHtml(): cache is empty then fetch data from API`);
        if(!cache.has(AppConst.KEY)) {
            Logger.info(`parseHtml(): parse HTML`);
            const response = await axios.get('https://www.actian.com/company/careers/');
            const $ = cheerio.load(response?.data ?? '')
            const jobList = $(".lever-jobs-wrapper .job-posting");
            
            let actianJobList: DepartmentJob[] = [];
            
            jobList.each(function(_, _1) {
                let departmentJob: DepartmentJob = {
                    department: $(this).find(".job-heading .department").text(),
                    openings: []
                }

                const jobForDepartmentList = $(this).find(".job-content .listing");
                jobForDepartmentList.each((_2, elm1) => {
                    let job: Job = {
                        position: $(elm1).find(".job-name").text(),
                        location: $(elm1).find(".job-position").text(),
                        jobLink: ''+$(elm1).find("a").attr("href"),
                    }
                    departmentJob.openings.push(job);
                })

                actianJobList.push(departmentJob);
            });

            Logger.info(`parseHtml(): set data in cache and TTL = ${AppConst.TTL}`);
            cache.set(AppConst.KEY, actianJobList, AppConst.TTL);
        }
    }
}

export default ActianService;