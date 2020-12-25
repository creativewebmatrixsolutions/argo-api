import { IArgoUser, IArgoWallet, IUserModel } from './model';

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {

    /**
     * @returns {Promise<IUserModel[]>}
     * @memberof IUserService
     */
    findAll(): Promise<IUserModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    findOne(code: string): Promise<IUserModel>;

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    findOneByGithubId(id: string): Promise<IUserModel>;

    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    insert(IUserModel: IUserModel): Promise<IUserModel>;

    /**
     * @param {string} id
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    remove(id: string): Promise<IUserModel>;

    findOneAndUpdate(id: string, user: IArgoUser): Promise<any>;

    updateOrganization(orgId: string, userId: string): Promise<IUserModel>;

    updateUserOrganization(orgId: string, userId: string): Promise<IUserModel>;

    updateWalletBalance(id: string, wallet: IArgoWallet): Promise<any>;

    updateWalletAddress(id: string, wallet: IArgoWallet): Promise<any>;
    reduceWalletBalance(id: string, deduction: number): Promise<any>;

    findOneAndUpdateDepTime(id: string, deploymentTime: number, gasPrice: number): Promise<boolean>;
}
