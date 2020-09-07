import { AuthComponent } from '../components';
import { Router } from 'express';
import * as passport from 'passport';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/auth/github
 * @swagger
 * /auth/github/:
 *  get:
 *    description: sign up user to application with github
 *    tags: ["auth"]
 *    requestBody:
 *      description: sign up body
 *    responses:
 *      301:
 *        description: user successfuly signed in
 *        content:
 *          appication/json:
 *            example:
 *              status: 301
 */
router.get('/github', passport.authenticate('github'));

router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: 'http://localhost:3000/signup' }),
    async (req, res) => {
        res.redirect(
        `http://localhost:3000/dashboard`
      );
    }
  );


/**
 * @export {express.Router}
 */
export default router;
