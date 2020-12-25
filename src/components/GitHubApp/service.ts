import { IGitHubAppTokenService } from "./interface";
import { IGuHubAppToken } from "./model";
import GitHubAppTokenModel from './model'
import { Types } from "mongoose";
import UserModel from "../User/model";



const GithubAppService: IGitHubAppTokenService = {
    async findByUserId(id: Types.ObjectId): Promise<IGuHubAppToken> {
        const filter = {
            argoUserId: id
        }
        const result = await GitHubAppTokenModel.findOne(filter);
        return result;
    },

    async findByInstallationAndUserId(id: Types.ObjectId, installationId: number): Promise<IGuHubAppToken> {
        const filter = {
            installationId: installationId,
            argoUserId: id
        }
        const result = await GitHubAppTokenModel.findOne(filter);
        return result;
    },

    async create(gitHubToken: IGuHubAppToken): Promise<boolean> {
        const filter = {
            installationId: gitHubToken.installationId,
            argoUserId: gitHubToken.argoUserId
        }
        await GitHubAppTokenModel.findOneAndUpdate(filter, gitHubToken);
        return true;
    },
    async findAndCreate(gitHubId: number, token: string, installationId: number): Promise<boolean> {
        const filter = {
            "provider_profile.id": gitHubId
        };
        const user = await UserModel.findOne(filter);
        if (user) {
            const filter = {
                installationId: installationId,
                argoUserId: user.id
            };
            const update: IGuHubAppToken = {
                argoUserId: user._id,
                gitHubId: gitHubId,
                installationId: installationId,
                token: token
            }
            const findOne = await GitHubAppTokenModel.findOne(filter);

            if (!findOne) {
                await GitHubAppTokenModel.create(update);
            }
            else {
                await GitHubAppTokenModel.findOneAndUpdate(filter, update);
            }
            return true;
        }
    },
    async remove(installationId: number): Promise<boolean> {
        const filter = {
            installationId: installationId
        }
        console.log(filter);
        await GitHubAppTokenModel.findOneAndRemove(filter);
        return true;
    }
}
export default GithubAppService;