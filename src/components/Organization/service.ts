import { IOrganization, OrganizationModel } from './model';
import { IOrganizationService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IUserModelService}
 */
const OrganizationService: IOrganizationService = {
    /**
     * @returns {Promise < IOrganization[] >}
     * @memberof UserService
     */
    async findAll(): Promise < IOrganization[] > {
        try {
            return await OrganizationModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IOrganization >}
     * @memberof UserService
     */
    async findOne(id: string): Promise < IOrganization > {
        try {
            const organization: IOrganization = await OrganizationModel.findOne({
                _id: id
            });

            return organization;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IOrganizationModel >}
     * @memberof UserService
     */
    async insert(body: IOrganization): Promise < IOrganization > {
        try {
            const filter: IOrganization = await OrganizationModel.findOne({
                name: body.name
            });
            if (filter) {
                throw new Error('Organization already exist with this name');
            }
            const organization: IOrganization = await OrganizationModel.create(body);
            
            return organization;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async insertDefault(id: string): Promise<IOrganization> {
        try {
            const defaultOrganization: any = {
                name: 'default',
                users: [id]
            };
            const organization: IOrganization = await OrganizationModel.create(defaultOrganization as IOrganization);

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
    async remove(id: string): Promise < IOrganization > {
        try {
            const organization: IOrganization = await OrganizationModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return organization;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default OrganizationService;
