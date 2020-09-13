import * as connections from '../../config/connection/connection';
import { Document, Schema, Model } from 'mongoose';
import { IDeployment, IOrganization } from '../Organization/model';

/**
 * @export
 * @interface IRepository
 * @extends {Document}
 */
export interface IRepository extends Document {
    name: String;
    url: String;    
    webHook: String;
    deployments: [IDeployment['_id']];
    organizations: [IOrganization['_id']];
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

export const RepositoryModel: Model<IRepository> = connections.db.model<IRepository>('Repository', RepositorySchema);