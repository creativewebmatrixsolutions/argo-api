import { IOrganizationModel } from './model';

/**
 * @export
 * @interface IOrganizationService
 */
export interface IOrganizationService {

    /**
     * @returns {Promise<IOrganizationModel[]>}
     * @memberof IUserService
     */
    findAll(): Promise<IOrganizationModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IOrganizationModel>}
     * @memberof IUserService
     */
    findOne(code: string): Promise<IOrganizationModel>;

    /**
     * @param {IOrganizationModel} IOrganizationModel
     * @returns {Promise<IOrganizationModel>}
     * @memberof IUserService
     */
    insert(IOrganizationModel: IOrganizationModel): Promise<IOrganizationModel>;

    /**
     * @param {string} id
     * @returns {Promise<IOrganizationModel>}
     * @memberof IUserService
     */
    remove(id: string): Promise<IOrganizationModel>;
}
