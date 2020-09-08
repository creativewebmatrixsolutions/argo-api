
import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';
import { Types } from 'mongoose';

export interface IArgoSessionModel extends Document {
    user_id: Number;
    access_token: String;
    is_active: boolean;
}

const ArgoSessionSchema: Schema = new Schema({
    user_id: Number,
    access_token: String,
    is_active: Boolean,
});

export default connections.db.model<IArgoSessionModel>('ArgoSession', ArgoSessionSchema);
