import { AuthComponent } from '../components';
import { Router } from 'express';
import * as passport from 'passport';
import { IArgoSessionDto } from '../components/Session/interface';
import JWTTokenService from '../components/Session/service';
import { profile } from 'console';

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

    console.log(req.user.accessToken);

    console.log("Profile:- ", req.user.profile);

    const argoSessionDto: IArgoSessionDto = {
      user_id: req.user.profile.id,
      access_token: req.user.accessToken,
      is_active: true
    }
    const dtos = await JWTTokenService.findSessionOrCreate(argoSessionDto);
    const token = await JWTTokenService.GenerateToken(dtos);
    console.log(token);
    res.redirect(
      `http://localhost:3000/dashboard`
    );
  }
);

/**
 * GET method route
 * @example http://localhost:PORT/auth/gitlab
 * @swagger
 * /auth/gitlab/:
 *  get:
 *    description: sign up user to application with gitlab
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
router.get('/gitlab', passport.authenticate('gitlab', {
  scope: ['api']
}));

router.get(
  '/gitlab/callback',
  passport.authenticate('gitlab', { failureRedirect: 'http://localhost:3000/signup' }),
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
