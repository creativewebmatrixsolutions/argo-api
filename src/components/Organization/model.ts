import * as connections from '../../config/connection/connection';
import { Document, Schema, Model } from 'mongoose';
import { IUserModel } from '../User/model';

/**
 * @export
 * @interface IRepository
 * @extends { Document }
 */
export interface IRepository extends Document {
    name: String;
    url: String;
    webHook: String;
    deployments: [IDeployment['_id']];
}

/**
 * @export
 * @interface IDeployment
 * @extends {Document}
 */
export interface IDeployment extends Document {
    sitePreview: String;
    commitId: String;
    log: String;
    createdAt: Date;
}

/**
 * @export
 * @interface IOrganization
 * @extends {Document}
 */
export interface IOrganization extends Document {
    name: String;
    image: String;
    repositories: [IRepository['_id']];
    users: [IUserModel['_id']];
    username?: string;
}

const RepositorySchema: Schema = new Schema({
    name: String,
    url: String,
    webHook: String,
    deployments: {
        type: [Schema.Types.ObjectId],
        ref: 'Deployment',
    }
});

const DeploymentSchema: Schema = new Schema({
    sitePreview: String,
    commitId: String,
    log: [String],
    createdAt: { type: Date, default: new Date() }
});

const OrganizationSchema: Schema = new Schema({
    profile: {
        name: { type: String, default: 'default', required: true },
        image: { type: String, required: false },
        username: String,
    },
    repositories: [RepositorySchema],
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'UserModel',
    }
}, {
    collection: 'organizationsdb',
    versionKey: false
});

export const DeploymentModel: Model<IDeployment> = connections.db.model<IDeployment>('Deployment', DeploymentSchema);
export const OrganizationModel: Model<IOrganization> = connections.db.model<IOrganization>('Organization', OrganizationSchema);
