import { Types } from 'mongoose';
import { IOrganizationModel } from '../Organization/model';
import OrganizationService from '../Organization/service';
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
            const user: IUserModel = new UserModel({
                profile: body.profile,
                provider: body.provider,
            });
            const query: IUserModel = await UserModel.findOne({
                'profile.id': body.profile.id
            });

            if (query) {
                console.log('User already present');
                return query;
            }
            const saved: IUserModel = await user.save();

            const org: IOrganizationModel = await OrganizationService.insertDefault(saved.id);

            console.log(org.id);
            console.log(saved.id);

            const filter = {
                '_id': Types.ObjectId(saved.id)
            }
            const update = {
                $addToSet: { organization: [org.id] }
            }
            const updatedModel: IUserModel = await UserModel.updateOne(filter, update);
            return saved;
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default AuthService;
