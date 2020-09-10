import UserModel, { IUserModel, IUser } from '../User/model';
import { IAuthService } from './interface';

/**
 * @export
 * @implements {IAuthService}
 */
const AuthService: IAuthService = {

    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    async findProfileOrCreate(body: IUser): Promise<IUserModel> {
        try {
            // const validate: Joi.ValidationResult < IUserModel > = AuthValidation.createUser(body);

            // if (validate.error) {
            //     throw new Error(validate.error.message);
            // }

            // console.log(body);

            const user: IUserModel = new UserModel({
                profile: body.profile,
                provider: body.provider,
            });

            // console.log(user);

            const query: IUserModel = await UserModel.findOne({
                'profile.id': body.profile.id
            });

            console.log(query);

            if (query) {
                console.log('User already present');
                return;
            }
            const saved: IUserModel = await user.save();

            return saved;
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default AuthService;
