import { IRepository } from '../Organization/model';

/**
 * @export
 * @interface IRepositoryService
 */
export interface IRepositoryService {

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
    insert(repository: IRepository, organizationId: string): Promise<IRepository>;

    findOneAndUpdate(id: string, body: any): Promise<boolean>;
}
