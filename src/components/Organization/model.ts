import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface IOrganizationModel
 * @extends {Document}
 */
export interface IRepositoriesDetailModel extends Document {
    commit_id: string;
    repo_url: string;
    logs: string;
    site_preview: string;
    date_deploy: Date;
}

/**
 * @export
 * @interface IOrganizationModel
 * @extends {Document}
 */
export interface IDeploymentsModel extends Document {
    total_deployments: number;
    repositories: IRepositoriesDetailModel[];
}

/**
 * @export
 * @interface IOrganizationModel
 * @extends {Document}
 */
export interface IOrganizationModel extends Document {
    name: string;
    deployments: IDeploymentsModel[];
    users: string[];
}

const RepositoriesDetailSchema: Schema = new Schema({
    commit_id: String,
    repo_url: String,
    logs: String,
    site_preview: String,
    date_deploy: { type: Date, default: new Date() },
});

const DeploymentsSchema: Schema = new Schema({
    total_deployments: { type: Number, default: 0 },
    repositories: [RepositoriesDetailSchema]
});

/**
 * @swagger
 * components:
 *  schemas:
 *    OrganizationSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const OrganizationSchema: Schema = new Schema({
    name: { type: String, default: 'default' },
    deployments: [DeploymentsSchema],
    users: { type: [String], default: [] }
}, {
    collection: 'organizations',
    versionKey: false
});


export default connections.db.model<IOrganizationModel>('OrganizationModel', OrganizationSchema);
