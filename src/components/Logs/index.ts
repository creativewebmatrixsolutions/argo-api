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

const socket = io(config.default.flaskApi.BASE_ADDRESS);

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function test(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const uniqueTopicName = uuidv4();
        const body: IInternalApiDto = {
            github_url: req.body.github_url,
            folder_name: req.body.folder_name,
            topic: uniqueTopicName
        };
        axios.post(config.default.flaskApi.HOST_ADDRESS, body).catch(err => console.log(err));

        const deploymentId: Types.ObjectId = await DeploymentService.createAndDeployRepo(req.body)
        socket.on(uniqueTopicName, async (data: any) => {
            console.log(data);
            const depFilter = {
                '_id': deploymentId
            };
            const updateDeployment = {
                $addToSet: { log: [data] },
            };
            await DeploymentModel.findOneAndUpdate(depFilter, updateDeployment).catch(err => console.log(err));
        });

        res.status(200).json({
            success: true,
            topic: uniqueTopicName
        });

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
