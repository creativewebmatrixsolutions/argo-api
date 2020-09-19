import { Types } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { IInvitationService } from './interface';
import { IUserInvite, UserInviteModel } from './model';

/**
 * @export
 * @implements {IInvitationService}
 */

const InvitationService: IInvitationService = {
    async sendMail(
    to: string,
    inviteId: string,
    orgName: string
  ): Promise<Boolean> {
        let _transporter: nodemailer.Transporter;
        try {
            _transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                service: 'gmail',
                auth: {
                    user: 'user mail id',
                    pass: 'user password', // generated ethereal password
                },
            });

            const options: any = {
                from: '"Argo Setup 👻" argotesting11@gmail.com', // sender address
                // tslint:disable-next-line: object-shorthand-properties-first
                to, // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Argo testing mail', // plain text body
                html: `http://localhost:3000/invite/callback?ref=${encodeURIComponent(inviteId)}&orgName=${encodeURIComponent(orgName)}`, // html body
            };

            _transporter.sendMail(options, (error, info) => {
                if (error) {
                    return console.log(`error: ${error}`);
                }
                console.log(`Message Sent ${info.response}`);
            });

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    },

  /**
   * @param {string} id
   * @returns {Promise <IUserInvite >}
   * @memberof InvitationService
   */
    async findOne(id: string): Promise<IUserInvite> {
        try {
            return await UserInviteModel.findOne({
        _id: Types.ObjectId(id),
      }).populate('organizations', '_id');
        } catch (error) {
            throw new Error(error.message);
        }
    },

  /**
   * @param {IUserInvite} userInvite
   * @returns {Promise <IUserInvite>}
   * @memberof InvitationService
   */
    async insert(body: IUserInvite): Promise<IUserInvite> {
        try {
            const user: IUserInvite = await UserInviteModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

  /**
   * @param {string} id
   * @returns {Promise <any>}
   * @memberof UserService
   */
    async findOneAndUpdate(
    inviteId: string,
    status: string
  ): Promise<IUserInvite> {
        try {
            const filter: any = {
                _id: inviteId,
            };
            const update: any = {
                status,
            };
            const updatedUser: any = await UserInviteModel.findOneAndUpdate(filter, update);

            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default InvitationService;
