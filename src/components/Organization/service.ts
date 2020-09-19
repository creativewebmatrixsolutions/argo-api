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
    async findAll(): Promise<IOrganization[]> {
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
    async findOne(id: string): Promise<IOrganization> {
        try {
            const organization: IOrganization = await OrganizationModel.findOne({ _id: Types.ObjectId(id) }).populate('users');

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
    async insert(body: any): Promise<IOrganization> {
        try {
            const filter: IOrganization = await OrganizationModel.findOne({
                'profile.name': body.name,
            });
            if (filter) {
                throw new Error('Organization already exist with this name');
            }
            const createObj: any = {
                profile: body,
            };
            const organization: IOrganization = await OrganizationModel.create(createObj);

            return organization;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async insertDefault(id: string): Promise<IOrganization> {
        try {
            const defaultOrganization: any = {
                'profile.name': 'default',
                'profile.username': 'default',
                users: [id],
            };
            const organization: IOrganization = await OrganizationModel.create(
        defaultOrganization as IOrganization
      );

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
    async remove(id: string): Promise<IOrganization> {
        try {
            const organization: IOrganization = await OrganizationModel.findOneAndRemove(
                {
                    _id: Types.ObjectId(id),
                }
      );

            return organization;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async findOneAndUpdate(Id: string, userId: string): Promise<any> {
        try {
            console.log('find one and update organization');
            const filter: any = {
                _id: Id,
            };
            const update: any = {
                $addToSet: { users: [Types.ObjectId(userId)] },
            };
            const updatedOrganization: any = await OrganizationModel.findOneAndUpdate(filter, update);

            return updatedOrganization;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateOrganization(org_id: string, org: any): Promise<any> {
        try {
            console.log('find one and update organization');
            const filter: any = {
                _id: Types.ObjectId(org_id),
            };

            const update: any = {
                'profile.name': org.name,
                'profile.image': org.image,
                'profile.username': org.username,
            };

            const updatedOrganization: any = await OrganizationModel.findOneAndUpdate(filter, update);
            
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default OrganizationService;
