import { IArgoJwtTokenService, IArgoSessionDto } from "./interface";
import ArgoSessionModel, { IArgoSessionModel } from "./model";
import config from '../../config/env/index';

import { sign } from 'jsonwebtoken';
import { resolve } from "path";
import { rejects } from "assert";


const JWTTokenService: IArgoJwtTokenService = {
    async findSessionOrCreate(body: IArgoSessionDto): Promise<IArgoSessionModel> {
        try {
            // const validate: Joi.ValidationResult < IUserModel > = AuthValidation.createUser(body);

            // if (validate.error) {
            //     throw new Error(validate.error.message);
            // }

            // console.log(body);

            const user: IArgoSessionModel = new ArgoSessionModel({
                user_id: body.user_id,
                access_token: body.access_token,
                is_active: body.is_active
            });

            // console.log(user);

            console.log(`I AM IN SERVICE ${body.user_id}`);

            const query: IArgoSessionModel = await ArgoSessionModel.findOne({
                'user_id': body.user_id
            });

            console.log("i am in query" + query);

            if (query) {
                console.log('user already logged in');
                return query;
            }

            const saved: IArgoSessionModel = await user.save();

            return saved;
        } catch (error) {
            throw new Error(error);
        }
    },

    async GenerateToken(argoSessionDto: IArgoSessionDto): Promise<string> {
        let payload = {
            user_id: argoSessionDto.user_id,
            access_token: argoSessionDto.access_token,
            is_active: argoSessionDto.is_active
        }
        return new Promise((resolve, reject) => {
            sign(payload, config.secret, { expiresIn: '24h', issuer: "www.argoapplive.live" }, (err: Error, encoded: string) => {
                console.log(encoded);
                resolve(encoded);
            });
        })

    }
}

export default JWTTokenService;