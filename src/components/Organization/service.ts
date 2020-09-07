import * as Joi from 'joi';
import OrganizationModel, { IOrganizationModel } from './model';
import OrganizationValidation from './validation';
import { IOrganizationService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IUserModelService}
 */
const OrganizationService: IOrganizationService = {
    /**
     * @returns {Promise < IOrganizationModel[] >}
     * @memberof UserService
     */
    async findAll(): Promise < IOrganizationModel[] > {
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
    async findOne(id: string): Promise < IOrganizationModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = OrganizationValidation.getUser({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await OrganizationModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IOrganizationModel >}
     * @memberof UserService
     */
    async insert(body: IOrganizationModel): Promise < IOrganizationModel > {
        try {
            const validate: Joi.ValidationResult < IOrganizationModel > = OrganizationValidation.createUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
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
    async remove(id: string): Promise < IOrganizationModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = OrganizationValidation.removeUser({
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
