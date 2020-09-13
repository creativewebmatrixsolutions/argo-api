import RepositoryService from './service';
import { HttpError } from '../../config/error';
import { IRepository } from './model';
import { NextFunction, Request, Response } from 'express';

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
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IRepository = await RepositoryService.findOne(req.params.id);

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
export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const organization: IRepository = await RepositoryService.insert(req.body);

        res.status(201).json(organization);
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
export async function remove(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const organization: IRepository = await RepositoryService.remove(req.params.id);

        res.status(200).json(organization);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}