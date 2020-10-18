import { Router } from 'express';
import { WebHookComponent } from '../components';

const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/v1/webhook/create
 * 
 * @swagger
 * /v1/webhook/create:
 *   post:
 *      description: add webhook
 *      tags: ["webhook"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: webhook request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeploymentSchema'
 *            example:
 *              url :""
 *      responses:
 *        201:
 *          description: return webhook
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/DeploymentSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/create', WebHookComponent.createWebHook);

/**
 * POST method route
 * @example http://localhost:PORT/v1/webhook/notifyOnPush
 * 
 * @swagger
 * /v1/webhook/notifyOnPush:
 *   post:
 *      description: notify on push 
 *      tags: ["Logs"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: notify On Push request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeploymentSchema'
 *            example:
 *              url :""
 *      responses:
 *        201:
 *          description: return logs
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/DeploymentSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/notifyOnPush', WebHookComponent.pushNotify);

export default router;
