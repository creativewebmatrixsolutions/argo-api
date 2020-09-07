import * as Joi from 'joi';
import Validation from '../validation';
import { IOrganizationModel } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class OrganizationValidation extends Validation {

    /**
     * Creates an instance of UserValidation.
     * @memberof OrganizationValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IOrganizationModel} params
     * @returns {Joi.ValidationResult<IOrganizationModel >}
     * @memberof OrganizationValidation
     */
    createUser(
        params: IOrganizationModel
    ): Joi.ValidationResult < IOrganizationModel > {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof OrganizationValidation
     */
    getUser(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof OrganizationValidation
     */
    removeUser(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new OrganizationValidation();
