import OrganizationService from './service';
import { HttpError } from '../../config/error';
import { IOrganizationModel } from './model';
import { NextFunction, Request, Response } from 'express';
import JWTTokenService from '../Session/service';
import { IOrganizationDto } from './organizationDto';
import UserService from '../User/service';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const users: IOrganizationModel[] = await OrganizationService.findAll();

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
        //const user: IOrganizationModel = await OrganizationService.findOne(req.params.id);

        res.status(200).json();
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
        const user: IOrganizationModel = await OrganizationService.insert(req.body);

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
        const user: IOrganizationModel = await OrganizationService.remove(req.params.id);

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
export async function FindOrCreateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const argoDecodedHeaderToken: any = await JWTTokenService.DecodeToken(req);
        const deserializedToken: any = await JWTTokenService.VerifyToken(argoDecodedHeaderToken);

        console.log(req.body.org_name);
        const orgDto: IOrganizationDto = {
            name: req.body.org_name,
            users: deserializedToken.session_id
        }
        const org: IOrganizationModel = await OrganizationService.insert(orgDto);
        await UserService.updateOrganization(org._id, deserializedToken.session_id);
        res.status(200).json({ success: true });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
