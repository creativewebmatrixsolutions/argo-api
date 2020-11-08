import { NextFunction, Request, Response } from 'express';
import HttpError from '../../config/error';
import config from '../../config/env/index';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { DeploymentModel, IDeployment, RepositoryModel } from '../Organization/model';
import { IInternalApiDto } from './interface';
import DeploymentService from './service';
import { Types } from 'mongoose';
import JWTTokenService from '../Session/service';
import UserService from '../User/service';
const { createAppAuth } = require("@octokit/auth-app");
const fs = require('fs');
const path = require('path');
const fullPath = path.join(__dirname, "../../templates/user-org-invite/argoappprod.pem");

const readAsAsync = fs.readFileSync(fullPath, 'utf8');

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
        let fullGitHubPath: string;
        console.log(req.body.isPrivate);
        if (req.body.isPrivate) {
            let installationToken = await createInstallationToken(req.body.installationId, req.body.repositoryId);
            fullGitHubPath = `https://x-access-token:${installationToken.token}@github.com/izrake/${folderName}.git`
        }
        else {
            fullGitHubPath = `${req.body.github_url} --branch ${req.body.branch}`;
        }
        const body: IInternalApiDto = {
            github_url: fullGitHubPath,
            folder_name: folderName,
            topic: uniqueTopicName,
            framework: req.body.framework,
            package_manager: req.body.package_manager,
            branch: req.body.branch,
            build_command: req.body.build_command,
            publish_dir: req.body.publish_dir
        };
        const deploymentObj: any = await DeploymentService.createAndDeployRepo(req.body, uniqueTopicName);

        const globalPrice: number = 0;
        let startTime: any;
        let totalGasPrice: number = 0;
        socket.on(uniqueTopicName, async (data: any) => {
            emitter.emit(uniqueTopicName, data);
            const depFilter: any = {
                _id: deploymentObj.deploymentId
            };
            const isLink: boolean = data.indexOf(config.arweaveUrl) !== -1;

            const indexOfTotalPrice = data.indexOf("Total price:");

            if (!startTime) {
                startTime = new Date();
            }

            if (indexOfTotalPrice !== -1) {
                const splitOne = data.split(":")[1];
                const splitTwo = splitOne.split("AR");
                totalGasPrice = splitTwo[0].trim();
            }
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
                const endDateTime: any = new Date();
                const totalTime = Math.abs(endDateTime - startTime);
                const deploymentTime: number = parseInt((totalTime / 1000).toFixed(1));
                const argoDecodedHeaderToken: any = await JWTTokenService.DecodeToken(req);
                const deserializedToken: any = await JWTTokenService.VerifyToken(argoDecodedHeaderToken);
                let user = await UserService.findOneAndUpdateDepTime(deserializedToken.session_id, deploymentTime, totalGasPrice);
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


const createInstallationToken = async (installationId: any, repositoryId: any) => {
    const auth = await createAppAuth({
        id: config.githubApp.GIT_HUB_APP_ID,
        privateKey: readAsAsync,
        installationId: installationId,
        clientId: config.githubApp.GITHUB_APP_CLIENT_ID,
        clientSecret: config.githubApp.GITHUB_APP_CLIENT_SECRET,
    });
    const authToken = await auth({ type: "app" });
    const installationToken = await auth({ type: "installation" });
    console.log(installationToken);
    return installationToken;
}
