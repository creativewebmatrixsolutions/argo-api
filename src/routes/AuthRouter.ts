
import { Router } from 'express';
import * as passport from 'passport';
import AuthService from '../components/Auth/service';
import { IArgoSessionDto } from '../components/Session/interface';
import JWTTokenService from '../components/Session/service';
import { IUserModel } from '../components/User/model';

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

    const userProfileModel: IUserModel = await AuthService.findProfileOrCreate({
      profile:
      {
        ...req.user.profile._json, provider_username: req.user.profile.username,
        argo_username: req.user.profile.username
      }, provider: { name: req.user.profile.provider }
    });

    const argoSessionDto: IArgoSessionDto = {
      session_id: userProfileModel.id,
      access_token: req.user.accessToken,
      is_active: true,
    }

    const dtos = await JWTTokenService.findSessionOrCreate(argoSessionDto);
    const token = await JWTTokenService.generateToken(dtos);
    res.redirect(
      `http://localhost:3000/dashboard?token=${token}`
    );
  }
);

router.delete('/logout', async (req, res) => {
  let token: any = await JWTTokenService.DecodeToken(req);
  let verifiedToken: any = await JWTTokenService.VerifyToken(token);
  await JWTTokenService.FindAndRemove(verifiedToken.session_id);
  await req.logOut();
  req.session = null;
  res.clearCookie("api.sid");
  return res.redirect('http://localhost:3000/signup')
});

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
