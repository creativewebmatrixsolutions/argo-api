import * as Joi from 'joi';
import UserModel, { IUserModel } from './model';
import UserValidation from './validation';
import { IUserService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
     */
    async findAll(): Promise<IUserModel[]> {
        try {
            return await UserModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async findOne(id: string): Promise<IUserModel> {
        try {
            return await UserModel.findOne({
                'profile.id': id
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
    * @param {string} id
    * @returns {Promise < IUserModel >}
    * @memberof UserService
    */
    async findOneAndUpdate(id: string, argo_username: string): Promise<any> {
        try {

            const filter = {
                'profile.id': id
            }
            const update = {
                'profile.argo_username': argo_username
            }

            await UserModel.findOneAndUpdate(filter, update)
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async findOneByGithubId(id: string): Promise<IUserModel> {
        try {
            return await UserModel.findOne({
                profile: { id: Types.ObjectId(id) }
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async insert(body: IUserModel): Promise<IUserModel> {
        try {
            const validate: Joi.ValidationResult<IUserModel> = UserValidation.createUser(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IUserModel = await UserModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async remove(id: string): Promise<IUserModel> {
        try {
            const validate: Joi.ValidationResult<{
                id: string
            }> = UserValidation.removeUser({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: IUserModel = await UserModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default UserService;
