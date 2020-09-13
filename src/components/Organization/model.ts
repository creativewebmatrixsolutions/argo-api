import * as connections from '../../config/connection/connection';
import { Document, Schema, Model } from 'mongoose';
import { IUserModel } from '../User/model';
import { IRepository } from '../Repository/model';

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
}

const DeploymentSchema: Schema = new Schema({
    sitePreview: String,
    commitId: String,
    log: String,
    createdAt: { type: Date, default: new Date() }
});

const OrganizationSchema: Schema = new Schema({
    name: { type: String, default: 'default', required: true },
    image: { type: String, required: false  },
    repositories: { 
        type: [Schema.Types.ObjectId],
        ref: 'Repository',
    },
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
