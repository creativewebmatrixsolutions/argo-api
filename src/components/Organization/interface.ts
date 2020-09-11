import { IOrganizationModel } from './model';
import { IOrganizationDto } from './organizationDto';

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
    findOne(id: string[]): Promise<IOrganizationModel[]>

    /**
     * @param {IOrganizationModel} IOrganizationModel
     * @returns {Promise<IOrganizationModel>}
     * @memberof IUserService
     */
    insert(orgDto: IOrganizationDto): Promise<IOrganizationModel>;

    /**
     * @param {string} id
     * @returns {Promise<IOrganizationModel>}
     * @memberof IUserService
     */
    remove(id: string): Promise<IOrganizationModel>;

    insertDefault(id: string): Promise<IOrganizationModel>;


}
