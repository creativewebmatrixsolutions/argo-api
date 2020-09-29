import RepositoryService from './service';
import { HttpError } from '../../config/error';
import { IRepository } from '../Organization/model';
import { NextFunction, Request, Response } from 'express';
import JWTTokenService from '../Session/service';
import { IArgoSessionModel } from '../Session/model';
import { IRepositoryService } from './interface';
const { Octokit } = require("@octokit/core");

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
            type: "all"
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

