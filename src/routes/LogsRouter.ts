import { Router } from "express";
import { LogsComponent } from "../components";

const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/v1/logs
 * 
 * @swagger
 * /v1/logs:
 *   post:
 *      description: add logs
 *      tags: ["Logs"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: logs request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Deployment'
 *            example:
 *              url :""
 *      responses:
 *        201:
 *          description: return logs
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/Deployment'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/", LogsComponent.Deploy);


/**
 * GET method route 
 * @example http://localhost:PORT/v1/logs/:id
 * 
 * @swagger
 * /v1/logs/{id}:
 *  get:
 *    description: Get Logs by Id
 *    tags: ["Logs"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique LogId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return logs by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/Deployment'
 */
router.get("/:id", LogsComponent.FindDeploymentById);

export default router;
