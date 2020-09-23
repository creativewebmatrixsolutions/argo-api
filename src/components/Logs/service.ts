import { Types } from "mongoose";
import { DeploymentModel, IDeployment, IOrganization, IRepository, OrganizationModel, RepositoryModel } from "../Organization/model";
import { IDeploymentDto, IDeploymentService } from "./interface";


const DeploymentService: IDeploymentService = {

    async createAndDeployRepo(body: any, topic: string): Promise<any> {
        // create deployment and
        const deployment: IDeploymentDto = {
            sitePreview: '',
            commitId: '00192',
            log: ['Build started'],
            createdAt: Date.now(),
            topic: topic
        };

        const deploymentModel: IDeployment = await DeploymentModel.create(deployment);
        // fetch repo with url name
        const repositoryId: any = await findOneAndCreateRepo(body, deploymentModel._id);
        return {
            deploymentId: deploymentModel._id,
            repositoryId: repositoryId._id
        }
    },
    async FindOneDeployment(deploymentId: string): Promise<IDeployment> {
        // create deployment and

        const filter = {
            '_id': Types.ObjectId(deploymentId)
        }
        const deployment: IDeployment = await DeploymentModel.findById(filter);
        return deployment;
    }
}


const findOneAndCreateRepo = async (body: any, deploymentId: Types.ObjectId): Promise<any> => {
    const filter = {
        'url': body.github_url
    }

    console.log('giturl: ', body.github_url);
    const findOneRepo: IRepository = await RepositoryModel.findOne(filter);

    if (findOneRepo) {

        console.log(findOneRepo);
        const filter = {
            '_id': Types.ObjectId(findOneRepo._id)
        }
        const updateDeploymentId = {
            $addToSet: {
                deployments: [deploymentId]
            }
        }
        await RepositoryModel.findOneAndUpdate(filter, updateDeploymentId);
        return findOneRepo._id;
    }

    const update = {
        name: body.folder_name,
        url: body.github_url,
        'webHook': "xyz",
        deployments: [deploymentId]
    };
    const repository: IRepository = await RepositoryModel.create(update);
    const orgFilter = {
        '_id': Types.ObjectId(body.orgId)
    };
    const updateOrg: any = {
        $addToSet: { repositories: [Types.ObjectId(repository._id)] },
    };
    await OrganizationModel.findOneAndUpdate(orgFilter, updateOrg);
    return repository._id;
}

export default DeploymentService;