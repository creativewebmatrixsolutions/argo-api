import UserService from './service';
import { HttpError } from '../../config/error';
import { IUserModel } from './model';
import { NextFunction, Request, Response } from 'express';
import OrganizationService from '../Organization/service';
import { IOrganization } from '../Organization/model';

import JWTTokenService from '../Session/service';


/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const users: IUserModel[] = await UserService.findAll();

        res.status(200).json(users);
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
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const argoDecodedHeaderToken: any = await JWTTokenService.DecodeToken(req);

        console.log(argoDecodedHeaderToken);

        const deserializedToken: any = await JWTTokenService.VerifyToken(argoDecodedHeaderToken);

        console.log('Deserialized Token: ', deserializedToken);

        // const argoSessionModel: IArgoSessionModel = await JWTTokenService.findOneByUserId(deserializedToken.session_id.toString());

        // console.log(argoSessionModel);
        console.log(deserializedToken.session_id);
        const user: IUserModel = await UserService.findOne(deserializedToken.session_id);

        console.log("this is", user);
        const org: IOrganization[] = await OrganizationService.findOne(user.organizations);

        res.status(200).json({ user, org });
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
        const user: IUserModel = await UserService.insert(req.body);

        res.status(201).json(user);
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
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user: IUserModel = await UserService.remove(req.params.id);

        res.status(200).json(user);
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
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const argoDecodedHeaderToken: any = await JWTTokenService.DecodeToken(req);
        const deserializedToken: any = await JWTTokenService.VerifyToken(argoDecodedHeaderToken);
        await UserService.findOneAndUpdate(deserializedToken.session_id, req.body.argo_username);
        res.status(200).json({
            success: true
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
