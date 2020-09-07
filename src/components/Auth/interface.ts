import { IUserModel, IUser } from '../User/model';

/**
 * @export
 * @interaface IAuthService
 */
export interface IAuthService {
    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof AuthService
     */
    findProfileOrCreate(IUserModel: IUser): Promise < IUserModel > ;
}
