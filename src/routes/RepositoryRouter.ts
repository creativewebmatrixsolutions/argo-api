import { Router } from 'express';
import { RepositoryComponent } from '../components';


const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/v1/repository
 * 
 * @swagger
 * /v1/repository:
 *   post:
 *      description: Create new User
 *      tags: ["repository"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: repository creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RepositorySchema'
 *            example:
 *                 name: String
 *                 url: String
 *                 webHook: String
 *                 deployments: string
 *                 updateDate: Date
 *                 createDate: Date
 *                 orgId: string
 *                 package_manager: string
 *                 build_command: string
 *                 publish_dir: string
 *                 branch: string
 *                 sitePreview: string
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/RepositorySchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */

router.post('/', RepositoryComponent.create);

/**
 * GET method route 
 * @example http://localhost:PORT/v1/repository/github/repo
 * 
 * @swagger
 * /v1/repository/github/repo:
 *  get:
 *    description: Get repository 
 *    tags: ["repository"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: get repositories
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return repositories
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/RepositorySchema'
 */
router.get('/github/repo', RepositoryComponent.GetUserRepos);

/**
 * GET method route 
 * @example http://localhost:PORT/v1/repository/:id
 * 
 * @swagger
 * /v1/repository/{id}:
 *  get:
 *    description: Get repository by repositoryId
 *    tags: ["repository"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique repositoryId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return repository by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/RepositorySchema'
 */
router.get('/:id', RepositoryComponent.findOne);

/**
 * PUT method route
 * @example http://localhost:PORT/v1/repository
 * 
 * @swagger
 * /v1/repository:
 *   post:
 *      description: Update repository 
 *      tags: ["users"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: repository update request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RepositorySchema'
 *            example:
 *              name: userName
 *              email: test.user@mail.com
 *      responses:
 *        201:
 *          description: return updated Repository
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/RepositorySchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.put('/:id', RepositoryComponent.findOneAndUpdate);

//router.get('/github/getcommits', RepositoryComponent.GetCommits);

export default router;
