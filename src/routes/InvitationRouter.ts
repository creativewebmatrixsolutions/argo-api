
import { Router } from 'express';

import { InvitationComponent } from '../components';


const router: Router = Router();
/**
 * POST method route
 * @example http://localhost:PORT/v1/invite
 * 
 * @swagger
 * /v1/invite:
 *   post:
 *      description: send invite
 *      tags: ["Invite"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: send invitation body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInviteSchema'
 *            example:
 *              email: email
 *              status:  pending|Approve|Rejected
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/UserInviteSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', InvitationComponent.sendInvite);

/**
 * POST method route
 * @example http://localhost:PORT/v1/invite/update
 * 
 * @swagger
 * /v1/invite/update:
 *   post:
 *      description: update invite 
 *      tags: ["Invite"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: update invitation body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInviteSchema'
 *            example:
 *              email: email
 *              status:  pending|Approve|Rejected
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/UserInviteSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/update', InvitationComponent.updateInvite);

export default router;
