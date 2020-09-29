import { HttpError } from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import * as config from '../../config/env/index'
import WebHookService from './service';
const { Octokit } = require('@octokit/core');
import { v4 as uuidv4 } from 'uuid';
import { IInternalApiDto } from './interface';
import axios from 'axios';
import { DeploymentModel, IRepository } from '../Organization/model';
import DeploymentService from '../Deployment/service';
import RepositoryService from '../Repository/service';

const io = require('socket.io-client');
const Server = require('socket.io');
const emitter = new Server();
const socket = io(config.default.flaskApi.BASE_ADDRESS);

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function createWebHook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
        const response: any = await WebHookService.createHook(req);

        res.status(200).json(response);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */


export async function pushNotify(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
        const uniqueTopicName: string = uuidv4();
        const splitUrl: any = req.body.repository.clone_url.split('/');
        const folderName: any = splitUrl[splitUrl.length - 1].split('.')[0];
        const branchName: any = req.body.ref.split('/').pop();
        const fullGitHubPath: string = `${req.body.repository.clone_url} --branch ${branchName}`;
        const repoData: IRepository = await RepositoryService.findRepoByNameAndBranch(req.body.repository.name, branchName);
        const body: IInternalApiDto = {
            github_url: fullGitHubPath,
            folder_name: folderName,
            topic: uniqueTopicName,
            package_manager: repoData.package_manager,
            branch: branchName,
            build_command: repoData.build_command,
            publish_dir: repoData.publish_dir
        };
        const deploymentObj: any = await DeploymentService.createAndDeployRepo(body, uniqueTopicName);

        console.log(uniqueTopicName);
        socket.on(uniqueTopicName, async (data: any) => {
            emitter.emit(uniqueTopicName, data);
            const depFilter: any = {
                _id: deploymentObj.deploymentId
            };
            const isLink: any = data.indexOf('https://arweave.net/') !== -1;
            let updateDeployment: any;

            if (isLink) {
                const arweaveLink: any = data.trim();

                updateDeployment = {
                    $addToSet: { log: [data] },
                    sitePreview: arweaveLink,
                    deploymentStatus: 'Deployed'
                };
            }else {
                updateDeployment = {
                    $addToSet: { log: [data] },
                    deploymentStatus: 'Pending'
                };
            }

            await DeploymentModel.findOneAndUpdate(depFilter, updateDeployment).catch((err) => console.log(err));
        });
        setTimeout(() => axios.post(config.default.flaskApi.HOST_ADDRESS, body).catch((err) => console.log(err)), 2000);

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


