import InvitationService from './service';
import { HttpError } from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import { IUserInvite } from './model';
import JWTTokenService from '../Session/service';
import OrganizationService from '../Organization/service';
import UserService from '../User/service';


/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function sendInvite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (req.body) {
            const User: IUserInvite = await InvitationService.insert(req.body);
            var response = await InvitationService.sendMail(req.body.userEmail);
            if (response) {
                res.status(200).json("Invitation send");
            }
        } else {
            res.status(400).json("Invitaion failed")
        }
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise <void>}
 */
export async function updateInvite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (req.body) {
            const argoDecodedHeaderToken: any = await JWTTokenService.DecodeToken(req);
            const deserializedToken: any = await JWTTokenService.VerifyToken(argoDecodedHeaderToken);
            console.log(req.body.id + "" + req.body.status);
            const user = await InvitationService.findOneAndUpdate(req.body.id, req.body.status);
            await OrganizationService.findOneAndUpdate(user.organization._id, deserializedToken.session_id);
            await UserService.updateUserOrganization(user.organization._id, deserializedToken.session_id)
            res.status(200).json(true);
        } else {
            res.status(400);
        }
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
