import { Types } from 'mongoose';
import { IRepository, IOrganization, OrganizationModel, RepositoryModel } from '../Organization/model';
import { IRepositoryService } from './interface';


/**
 * @export
 * @implements {IRepositoryService}
 */
const RepositoryService: IRepositoryService = {

    /**
     * @param {string} id
     * @returns {Promise < IRepository >}
     * @memberof UserService
     */
    async findOne(id: string): Promise<IRepository> {
        try {
            const repository: IRepository = await RepositoryModel.findOne({
                _id: Types.ObjectId(id)
            }).populate('deployments', 'branch topic createdAt sitePreview deploymentStatus package_manager build_command publish_dir');
            return repository;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} repoName
     * @param {string} branchName
     * @returns {Promise < IRepository >}
     * @memberof UserService
     */
    async findRepoByNameAndBranch(repoName: string, branchName: string): Promise<IRepository> {
        try {
            const repository: IRepository = await RepositoryModel.findOne({
                name: repoName, branch: branchName
            }).select('name package_manager build_command publish_dir -_id');

            return repository;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUserModel} user
     * @returns {Promise < IRepository >}
     * @memberof UserService
     */
    async insert(repository: IRepository, organizationId: string): Promise<IRepository> {
        try {
            const organization: IOrganization = await OrganizationModel.findOne({
                _id: organizationId
            });
            if (!organization) {
                throw new Error('Organization with given Id does not exist');
            }
            const repo: IRepository = organization.repositories.find((r: IRepository) => r.name === repository.name);
            if (repo !== undefined) {
                throw new Error('Repository with given name already exist');
            }
            organization.repositories.push(repository);
            await organization.save();

            return repository;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
 * @param {string} id
 * @returns {Promise < IRepository >}
 * @memberof UserService
 */
    async findOneAndUpdate(id: string, body: any): Promise<any> {
        try {
            const filter = {
                '_id': Types.ObjectId(id)
            };
            const update = {
                $set: {
                    'package_manager': body.package_manager,
                    'build_command': body.build_command,
                    'publish_dir': body.publish_dir,
                    'branch': body.branch
                }
            }
            await RepositoryModel.findOneAndUpdate(filter, update);
            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    }, async InsertDomain(id: string, domain: string, transactionId: string): Promise<any> {
        try {
            const filter = {
                '_id': Types.ObjectId(id)
            };
            var repo = await RepositoryModel.findOne(filter);
            var validateName = repo.domains.find(d => d.name === domain);
            if (validateName) {
                return false;
            }
            if (repo) {
                var addDomain = { name: domain, transactionId: transactionId };
                repo.domains.push(addDomain);
                await repo.save();
            }
            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    },

    async InsertSubDomain(id: string, domain: string, transactionId: string): Promise<any> {
        try {
            const filter = {
                '_id': Types.ObjectId(id)
            };
            var repo = await RepositoryModel.findOne(filter);
            var validateName = repo.subDomains.find(d => d.name === domain);
            if (validateName) {
                return false;
            }

            if (repo) {
                var addSubDomain = { name: domain, transactionId: transactionId };
                repo.subDomains.push(addSubDomain);
                await repo.save();
            }
            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    },
    async UpdateDomain(id: string, domain: string, transactionId: string): Promise<any> {
        try {
            const filter = {
                'domains._id': Types.ObjectId(id)
            };

            const updatCondition = {
                $set: {
                    'domains.$.name': domain,
                    'domains.$.transactionId': transactionId
                }
            }
            await RepositoryModel.findOneAndUpdate(filter, updatCondition);
            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    },

    async UpdateSubDomain(id: string, domain: string, transactionId: string): Promise<any> {
        try {
            const filter = {
                'subDomains._id': Types.ObjectId(id)
            };
            const updatCondition = {
                $set: {
                    'subDomains.$.name': domain,
                    'subDomains.$.transactionId': transactionId
                }
            }
            await RepositoryModel.findOneAndUpdate(filter, updatCondition);
            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    },
    async RemoveSubDomain(id: string, domain: string, transactionId: string): Promise<any> {
        try {
            const filter = {
                '_id': Types.ObjectId(id)
            };
            await RepositoryModel.updateOne(filter, { $pull: { subDomains: { name: domain, transactionId: transactionId } } });
            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    },

    async RemoveDomain(id: string, domain: string, transactionId: string): Promise<any> {
        try {
            const filter = {
                '_id': Types.ObjectId(id)
            };
            await RepositoryModel.updateOne(filter, { $pull: { domains: { name: domain, transactionId: transactionId } } });
            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default RepositoryService;
