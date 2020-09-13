import { IOrganization } from './model';

/**
 * @export
 * @interface IOrganizationService
 */
export interface IOrganizationService {

    /**
     * @returns {Promise<IOrganization[]>}
     * @memberof IOrganizationService
     */
    findAll(): Promise<IOrganization[]>;

    /**
     * @param {string} id
     * @returns {Promise<IOrganization>}
     * @memberof IOrganizationService
     */
    findOne(id: any): Promise<IOrganization[]>;

    /**
     * @param {IOrganization} IOrganizationModel
     * @returns {Promise<IOrganization>}
     * @memberof IOrganizationService
     */
    insert(orgDto: IOrganization): Promise<IOrganization>;

    /**
     * @param {string} id
     * @returns {Promise<IOrganization>}
     * @memberof IOrganizationService
     */
    remove(id: string): Promise<IOrganization>;

    /**
     * @param {string} id
     * @returns {Promise<IOrganization>}
     * @memberof IOrganizationService
     */
    insertDefault(id: string): Promise<IOrganization>;
}
