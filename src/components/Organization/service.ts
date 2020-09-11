import * as Joi from 'joi';
import OrganizationModel, { IOrganizationModel } from './model';
import OrganizationValidation from './validation';
import { IOrganizationService } from './interface';
import { Types } from 'mongoose';
import { IOrganizationDto } from './organizationDto';

/**
 * @export
 * @implements {IUserModelService}
 */
const OrganizationService: IOrganizationService = {
    /**
     * @returns {Promise < IOrganizationModel[] >}
     * @memberof UserService
     */
    async findAll(): Promise<IOrganizationModel[]> {
        try {
            return await OrganizationModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IOrganizationModel >}
     * @memberof UserService
     */
    async findOne(id: string[]): Promise<IOrganizationModel[]> {
        try {
            console.log(id);
            let array: Array<Types.ObjectId> = [];
            for (let i = 0; i < id.length; i++) {
                console.log(i);
                array[i] = Types.ObjectId(id[i]);
            }
            const test: IOrganizationModel[] = await OrganizationModel.find({
                '_id': {
                    $in: array
                }
            });
            return test;

        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IOrganizationModel >}
     * @memberof UserService
     */
    async insert(body: IOrganizationDto): Promise<IOrganizationModel> {
        try {
            const filter = await OrganizationModel.findOne({
                'name': body.name
            });
            if (filter) {
                throw new Error('Organization already exist with this name');
            }
            const user: IOrganizationModel = await OrganizationModel.create(body);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async insertDefault(id: string): Promise<IOrganizationModel> {
        try {
            const body = {
                name: 'default',
                users: [id]
            }
            const user: IOrganizationModel = await OrganizationModel.create(body);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IOrganizationModel >}
     * @memberof UserService
     */
    async remove(id: string): Promise<IOrganizationModel> {
        try {
            const validate: Joi.ValidationResult<{
                id: string
            }> = OrganizationValidation.removeUser({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IOrganizationModel = await OrganizationModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default OrganizationService;
