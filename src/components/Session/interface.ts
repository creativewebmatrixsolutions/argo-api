/**
 * @export
 * @interface IUserService
 */

import { IArgoSessionModel } from "./model";

export interface IArgoJwtTokenService {
    /**
    * @param {number} id
    * @returns {Promise<IArgoSessionModel>}
    * @memberof IArgoSessionModel
    */
    findSessionOrCreate(argoSessionDto: IArgoSessionDto): Promise<IArgoSessionModel>;

    GenerateToken(argoSessionDto: IArgoSessionDto): Promise<string>;
}

export interface IArgoSessionDto {
    user_id: Number;
    access_token: String;
    is_active: boolean;
}

