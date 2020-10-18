
import { Router } from 'express';

import { OrganizationComponent } from '../components';


const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/organization
 * 
 * @swagger
 * /v1/organization:
 *   get:
 *     description: Get all organization
 *     tags: ["Organization"]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: An array of organization
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/OrganizationSchema'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/', OrganizationComponent.findAll);

/**
 * GET method route 
 * @example http://localhost:PORT/v1/organization/:id
 * 
 * @swagger
 * /v1/organization/{id}:
 *  get:
 *    description: Get organization by  organizationId
 *    tags: ["Organization"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique organizationId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return organization by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/OrganizationSchema'
 */
router.get('/:id', OrganizationComponent.findOne);

/**
 * POST method route
 * @example http://localhost:PORT/v1/organization
 * 
 * @swagger
 * /v1/organization:
 *   post:
 *      description: Create new organization
 *      tags: ["organization"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: organization creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrganizationSchema'
 *            example:
 *               name: string,
 *               image: string,
 *               username: string,
 *               repositories: string,
 *               users: string
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/OrganizationSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', OrganizationComponent.create);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/organization/:id
 * 
 * @swagger
 * /v1/organization/{id}:
 *  delete:
 *    description: Delete organization by organizationId
 *    tags: ["organization"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique organizationId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted organization
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/OrganizationSchema'
 */
router.delete('/:id', OrganizationComponent.remove);


/**
 * PUT method route
 * @example http://localhost:PORT/v1/organization
 * 
 * @swagger
 * /v1/organization:
 *   put:
 *      description: Update organization 
 *      tags: ["organization"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: organization update request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OrganizationSchema'
 *            example:
 *               name: string,
 *               image: string, 
 *               username: string,
 *               repositories: string,
 *               users: string
 *      responses:
 *        201:
 *          description: return updated user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/OrganizationSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.put('/:id', OrganizationComponent.update);


export default router;
