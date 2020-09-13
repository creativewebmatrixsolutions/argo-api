import { IRepository, RepositoryModel } from './model';
import { IRepositoryService } from './interface';
import { Types } from 'mongoose';

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

    /**
     * @param {string} id
     * @returns {Promise < IRepository >}
     * @memberof UserService
     */
    async findOne(id: string): Promise < IRepository > {
        try {
            const organization: IRepository = await RepositoryModel.findOne({
                _id: id
            });

            return organization;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IRepository >}
     * @memberof UserService
     */
    async insert(body: IRepository): Promise < IRepository > {
        try {
            const filter: IRepository = await RepositoryModel.findOne({
                name: body.name
            });
            if (filter) {
                throw new Error('Organization already exist with this name');
            }
            const organization: IRepository = await RepositoryModel.create(body);
            
            return organization;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async insertDefault(id: string): Promise<IRepository> {
        try {
            const defaultOrganization: any = {
                name: 'default',
                users: [id]
            };
            const organization: IRepository = await RepositoryModel.create(defaultOrganization as IRepository);

            return organization;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IOrganization >}
     * @memberof UserService
     */
    async remove(id: string): Promise < IRepository > {
        try {
            const organization: IRepository = await RepositoryModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return organization;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default RepositoryService;
