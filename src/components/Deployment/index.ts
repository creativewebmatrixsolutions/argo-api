import { NextFunction, Request, Response } from 'express';
import HttpError from '../../config/error';
import config from '../../config/env/index';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { DeploymentModel, IDeployment, RepositoryModel } from '../Organization/model';
import { IInternalApiDto } from './interface';
import DeploymentService from './service';
import { Types } from 'mongoose';
import WebHookService from '../WebHook/service';
import { IWebHook } from '../WebHook/model';


const io: any = require('socket.io-client');

const Server: any = require('socket.io');
const emitter: any = new Server();

const socket: any = io(config.flaskApi.BASE_ADDRESS);

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function Deploy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const uniqueTopicName: string = uuidv4();
        const splitUrl: string = req.body.github_url.split('/');
        const folderName: string = splitUrl[splitUrl.length - 1].split('.')[0];
        const fullGitHubPath: string = `${req.body.github_url} --branch ${req.body.branch}`;
        const autoPublish: boolean = req.body.auto_publish;
        const body: IInternalApiDto = {
            github_url: fullGitHubPath,
            folder_name: folderName,
            topic: uniqueTopicName,
            package_manager: req.body.package_manager,
            branch: req.body.branch,
            build_command: req.body.build_command,
            publish_dir: req.body.publish_dir
        };
        const deploymentObj: any = await DeploymentService.createAndDeployRepo(req.body, uniqueTopicName);

        console.log(uniqueTopicName);
        socket.on(uniqueTopicName, async (data: any) => {
            emitter.emit(uniqueTopicName, data);
            const depFilter: any = {
                _id: deploymentObj.deploymentId
            };
            const isLink: boolean = data.indexOf(config.arweaveUrl) !== -1;

            let updateDeployment: any;

            if (isLink) {
                const arweaveLink: string = data.trim();
                
                updateDeployment = {
                    $addToSet: { logs: [{ time: new Date().toString(), log: data }] },
                    sitePreview: arweaveLink,
                    deploymentStatus: 'Deployed'
                };
                const repoFilter: any = {
                    _id: Types.ObjectId(deploymentObj.repositoryId)
                };

                const update: any = {
                    $set: {
                        sitePreview: arweaveLink
                    }
                };
                
                await RepositoryModel.findOneAndUpdate(repoFilter, update);
            } else {
                updateDeployment = {
                    $addToSet: { logs: [{ time: new Date().toString(), log: data }] },
                    deploymentStatus: 'Pending'
                };
            }

            await DeploymentModel.findOneAndUpdate(depFilter, updateDeployment).catch((err: Error) => console.log(err));
        });
        setTimeout(() => axios.post(config.flaskApi.HOST_ADDRESS, body).catch((err: Error) => console.log(err)), 2000);
        if (autoPublish) {
            const webHookDto: IWebHook = { 
                owner: req.body.owner,
                repo: req.body.folder_name
            };

            WebHookService.createHook(req, webHookDto);
        }
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

export async function FindDeploymentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const deployment: IDeployment = await DeploymentService.FindOneDeployment(req.params.id);

    res.status(200).json({
        deployment,
        success: true,
    });
}
