import { NextFunction, Request, Response } from 'express';
import HttpError from "../../config/error";
import * as config from "../../config/env/index"
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { DeploymentModel } from '../Organization/model';
import { Types } from 'mongoose';
import { IInternalApiDto } from './interface';
import DeploymentService from './service';


const io = require('socket.io-client');

const Server = require('socket.io');
const emitter = new Server();

const socket = io(config.default.flaskApi.BASE_ADDRESS);

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function Deploy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const uniqueTopicName = uuidv4();
        const splitUrl = req.body.github_url.split("/");
        const folderName = splitUrl[splitUrl.length - 1].split(".")[0];
        const fullGitHubPath: string = `${req.body.github_url} --branch ${req.body.branch}`;
        const body: IInternalApiDto = {
            github_url: fullGitHubPath,
            folder_name: folderName,
            topic: uniqueTopicName,
            package_manager: req.body.package_manager,
            branch: req.body.branch
        };
        const deploymentObj: any = await DeploymentService.createAndDeployRepo(req.body)

        console.log(uniqueTopicName);
        socket.on(uniqueTopicName, async (data: any) => {
            emitter.emit(uniqueTopicName, data);
            const depFilter = {
                '_id': deploymentObj.deploymentId
            };
            const updateDeployment = {
                $addToSet: { log: [data] },
            };
            await DeploymentModel.findOneAndUpdate(depFilter, updateDeployment).catch(err => console.log(err));
        });

        axios.post(config.default.flaskApi.HOST_ADDRESS, body).catch(err => console.log(err));

        res.status(200).json({
            success: true,
            topic: uniqueTopicName,
            deploymentId: deploymentObj.deploymentId,
            repositoryId: deploymentObj.repositoryId
        });

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
