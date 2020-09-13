import { IRepository } from './model';

/**
 * @export
 * @interface IRepositoryService
 */
export interface IRepositoryService {

    // /**
    //  * @returns {Promise<IRepository[]>}
    //  * @memberof IRepositoryService
    //  */
    // findAll(orgId: string): Promise<IRepository[]>;

    /**
     * @param {string} id
     * @returns {Promise<IRepository>}
     * @memberof IRepositoryService
     */
    findOne(id: string): Promise<IRepository>;

    /**
     * @param {IOrganization} IOrganizationModel
     * @returns {Promise<IOrganization>}
     * @memberof IRepositoryService
     */
    insert(orgDto: IRepository): Promise<IRepository>;

    /**
     * @param {string} id
     * @returns {Promise<IOrganization>}
     * @memberof IRepositoryService
     */
    remove(id: string): Promise<IRepository>;

    /**
     * @param {string} id
     * @returns {Promise<IRepository>}
     * @memberof IRepositoryService
     */
    insertDefault(id: string): Promise<IRepository>;
}