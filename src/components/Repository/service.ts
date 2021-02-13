import Arweave = require('arweave');
import { Types } from 'mongoose';
import { IRepository, IOrganization, OrganizationModel, RepositoryModel } from '../Organization/model';
import { IRepositoryService } from './interface';
import config from '../../config/env';
import deepHash from 'arweave/node/lib/deepHash';
import ArweaveBundles, { DataItemJson } from 'arweave-bundles';

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
    async RemoveSubDomain(id: string, repositoryId: string): Promise<any> {
        try {
            const filter = {
                '_id': Types.ObjectId(repositoryId)
            };
            await RepositoryModel.updateOne(filter, { $pull: { subDomains: { _id: Types.ObjectId(id) } } });
            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    },

    async RemoveDomain(id: string, repositoryId: string): Promise<any> {
        try {
            const filter = {
                '_id': Types.ObjectId(repositoryId)
            };
            await RepositoryModel.updateOne(filter, { $pull: { domains: { _id: Types.ObjectId(id) } } });
            return true;

        } catch (error) {
            throw new Error(error.message);
        }
    },
    async FindOneAndUpdate(id: string, link: string): Promise<number> {
        try {
            const repoFilter: any = {
                _id: Types.ObjectId(id)
            };
            let getRepo = await RepositoryModel.findOne(repoFilter);
            let arrDomains: Array<string> = [];
            if (getRepo) {
                // pull domains which has latest transactionIds
                for (let val in getRepo.domains) {
                    if (getRepo.domains[val].transactionId === "Latest" || getRepo.domains[val].transactionId === "latest") {
                        arrDomains.push(getRepo.domains[val].name);
                    }
                }
                for (let val in getRepo.subDomains) {
                    if (getRepo.subDomains[val].transactionId === "Latest" || getRepo.domains[val].transactionId === "latest") {
                        arrDomains.push(getRepo.subDomains[val].name);
                    }
                }
            }
            getRepo.sitePreview = link;
            await getRepo.save();
            if (arrDomains.length > 0) {
                const splitLink = link.split('/');
                const tx = splitLink[splitLink.length - 1];
                return await executeBundledTx(arrDomains, tx);
            }
            return 0;

        } catch (error) {
            throw new Error(error.message);
        }
    }
};

const executeBundledTx = async (domain: string[], txId: string) => {
    const arweave: Arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
    });
    const deps = {
        utils: Arweave.utils,
        crypto: Arweave.crypto,
        deepHash: deepHash,
    }
    const arBundles = ArweaveBundles(deps);
    let newTag: Array<any> = [];
    let dataItemJson: DataItemJson[] = [];
    let wallet: string = config.privateKey.PRIVATE_KEY;
    var walletParsed = JSON.parse(wallet);
    for (var val in domain) {
        let tag = [{
            name: "Content-Type",
            value: "x-arweave/name-update"
        }, {
            name: "Arweave-Domain",
            value: domain[val]
        }, {
            name: "Arweave-Hash",
            value: txId
        }
        ]
        let createData = await arBundles.createData({ data: "creating bundles", tags: tag }, walletParsed)
        newTag.push(createData);
    }
    for (let val in newTag) {

        let sign = await arBundles.sign(newTag[val], JSON.parse(wallet));
        dataItemJson.push(sign);
    }

    const bundles = await arBundles.bundleData(dataItemJson);
    let bundledString = JSON.stringify(bundles);
    const myTx = await arweave.createTransaction({ data: bundledString }, JSON.parse(wallet));
    await arweave.transactions.sign(myTx, JSON.parse(wallet));
    await arweave.transactions.post(myTx);
    let ar = arweave.ar.winstonToAr(myTx.reward);
    return parseInt(ar);
}

export default RepositoryService;
