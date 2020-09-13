import { IRepository, IOrganization, OrganizationModel } from '../Organization/model';
import { IRepositoryService } from './interface';


/**
 * @export
 * @implements {IRepositoryService}
 */
const RepositoryService: IRepositoryService = {
    // /**
    //  * @returns {Promise < IRepository[] >}
    //  * @memberof UserService
    //  */
    // async findAll(orgId: string): Promise < IRepository[] > {
    //     try {
    //         return await RepositoryModel.findOne({
    //             _id = orgId
    //         });
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // },

    // /**
    //  * @param {string} id
    //  * @returns {Promise < IRepository >}
    //  * @memberof UserService
    //  */
    // async findOne(id: string): Promise < IRepository > {
    //     try {
    //         const organization: IRepository = await RepositoryModel.findOne({
    //             _id: id
    //         });

    //         return organization;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IRepository >}
     * @memberof UserService
     */
    async insert(repository: IRepository, organizationId: string): Promise < IRepository > {
        try {
            console.log(organizationId);
            const organization: IOrganization = await OrganizationModel.findOne({
                _id: organizationId
            });
            if (!organization) {
                throw new Error('Organization with given Id does not exist');
            }
            console.log(organization);
            const repo: IRepository = organization.repositories.find((r: IRepository) => r.name === repository.name);
            console.log(repo);
            if (repo !== undefined) {
                throw new Error('Repository with given name already exist');
            }
            organization.repositories.push(repository);
            await organization.save();

            return repository;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // async insertDefault(id: string): Promise<IRepository> {
    //     try {
    //         const defaultOrganization: any = {
    //             name: 'default',
    //             users: [id]
    //         };
    //         const organization: IRepository = await RepositoryModel.create(defaultOrganization as IRepository);

    //         return organization;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // },

    // /**
    //  * @param {string} id
    //  * @returns {Promise < IOrganization >}
    //  * @memberof UserService
    //  */
    // async remove(id: string): Promise < IRepository > {
    //     try {
    //         const organization: IRepository = await RepositoryModel.findOneAndRemove({
    //             _id: Types.ObjectId(id)
    //         });

    //         return organization;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }
};

export default RepositoryService;
