import { HttpError } from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import WebHookService from './service';
const { Octokit } = require('@octokit/core');

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
        const response: any = await WebHookService.createHook(req.body);

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
        console.log(req.body);
        res.status(200).json(req.body);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


