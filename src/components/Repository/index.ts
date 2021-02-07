import RepositoryService from './service';
import { HttpError } from '../../config/error';
import { IRepository } from '../Organization/model';
import { NextFunction, Request, Response } from 'express';
import JWTTokenService from '../Session/service';
import { IArgoSessionModel } from '../Session/model';
import { Types } from 'mongoose';
import GithubAppService from '../GitHubApp/service';
const { Octokit } = require("@octokit/core");
const axios = require('axios').default;

// /**
//  * @export
//  * @param {Request} req
//  * @param {Response} res
//  * @param {NextFunction} next
//  * @returns {Promise < void >}
//  */
// export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
//     try {
//         const users: IRepository[] = await RepositoryService.findAll(req.params.id);

//         res.status(200).json(users);
//     } catch (error) {
//         next(new HttpError(error.message.status, error.message));
//     }
// }

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const repository: IRepository = await RepositoryService.findOne(req.params.id);

        res.status(200).json(repository);
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
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const repository: IRepository = await RepositoryService.insert(req.body, req.params.organizationId);

        res.status(201).json(repository);
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
export async function GetUserRepos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const getToken: any = await JWTTokenService.DecodeToken(req);
        const decodeToken: any = await JWTTokenService.VerifyToken(getToken);

        const argoSession: IArgoSessionModel = await JWTTokenService.FindOneBySessionId(decodeToken.session_id);

        console.log(argoSession);
        const octokit = new Octokit({ auth: `${argoSession.access_token}` });
        const response = await octokit.request("GET /user/repos", {
            type: "all",
            per_page: 100
        });
        res.status(200).json(response);

    } catch (error) {
        throw new Error(error)
    }
}

export async function findOneAndUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const repositoryStatus: boolean = await RepositoryService.findOneAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: repositoryStatus
        });

    } catch (error) {
        throw new Error(error)
    }
}

export async function getInstallationRepos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log(req.params);
        const argoDecodedHeaderToken: any = await JWTTokenService.DecodeToken(req);
        const deserializedToken: any = await JWTTokenService.VerifyToken(argoDecodedHeaderToken);
        let id = Types.ObjectId(deserializedToken.session_id);
        const getUserToken = await GithubAppService.findByUserId(id);
        const instanceAxios = axios.create({
            baseURL: `https://api.github.com/user/installations/${req.params.installationId}/repositories`,
            timeout: 5000,
            headers: {
                'authorization': `bearer ${getUserToken.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const response = await instanceAxios.get();
        console.log(response.data.repositories);
        res.status(200).json({
            success: true,
            repositories: response.data.repositories
        });

    } catch (error) {
        throw new Error(error)
    }


}

export async function getBranches(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const argoDecodedHeaderToken: any = await JWTTokenService.DecodeToken(req);
        const deserializedToken: any = await JWTTokenService.VerifyToken(argoDecodedHeaderToken);
        let id = Types.ObjectId(deserializedToken.session_id);
        const getUserToken = await GithubAppService.findByUserId(id);
        const instanceAxiosBranch = axios.create({
            baseURL: req.query.branches,
            timeout: 5000,
            headers: {
                'authorization': `bearer ${getUserToken.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const response = await instanceAxiosBranch.get();
        console.log("branches", response);
        res.status(200).json({
            success: true,
            branches: response.data
        });

    } catch (error) {
        throw new Error(error)
    }
}

