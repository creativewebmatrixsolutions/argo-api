import { Router } from 'express';
import * as passport from 'passport';
import AuthService from '../components/Auth/service';
import { IArgoSessionDto } from '../components/Session/interface';
import JWTTokenService from '../components/Session/service';
import { IUserModel } from '../components/User/model';

import * as config from '../config/env/index';

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
    passport.authenticate('github', {
        failureRedirect: `${config.default.argoReact.BASE_ADDRESS}/signup`,
    }),
    async (req, res) => {
        console.log(req.user.profile)
        const userProfileModel: IUserModel = await AuthService.findProfileOrCreate({
            provider_profile: {
                ...req.user.profile._json,
                username: req.user.profile.username,
                email: req.user.profile.emails?.filter((email: any) => email.primary || email.primary === undefined)[0].value
            },
            provider: { name: req.user.profile.provider },
            argo_profile: {
                username: req.user.profile.username,
                avatar: req.user.profile._json.avatar_url,
                email: req.user.profile.emails?.filter((email: any) => email.primary || email.primary === undefined)[0].value,
                name: req.user.profile.displayName
            }
        });

        const argoSessionDto: IArgoSessionDto = {
            session_id: userProfileModel.id,
            access_token: req.user.accessToken,
            is_active: true,
        };

        const dtos: IArgoSessionDto = await JWTTokenService.findSessionOrCreate(
            argoSessionDto
        );
        const token: string = await JWTTokenService.generateToken(dtos);

        res.redirect(`${config.default.argoReact.BASE_ADDRESS}/callback/github?token=${token}`);
    }
);

router.delete('/logout', async (req, res) => {
    const token: any = await JWTTokenService.DecodeToken(req);
    const verifiedToken: any = await JWTTokenService.VerifyToken(token);

    await JWTTokenService.FindAndRemove(verifiedToken.session_id);
    await req.logOut();
    req.session = null;
    res.status(200).json({ success: true });
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
router.get(
    '/gitlab',
    passport.authenticate('gitlab', {
        scope: ['api'],
    })
);

router.get(
    '/gitlab/callback',
    passport.authenticate('gitlab', {
        failureRedirect: `${config.default.argoReact.BASE_ADDRESS}/signup`,
    }),
    async (req, res) => {
        const userProfileModel: IUserModel = await AuthService.findProfileOrCreate({
            provider_profile: {
                ...req.user.profile._json
            },
            provider: { name: req.user.profile.provider },
            argo_profile: {
                username: req.user.profile._json.username,
                avatar: req.user.profile._json.avatar_url,
                email: req.user.profile._json.email,
                name: req.user.profile._json.name
            }
        });

        const argoSessionDto: IArgoSessionDto = {
            session_id: userProfileModel.id,
            access_token: req.user.accessToken,
            is_active: true,
        };

        const dtos: IArgoSessionDto = await JWTTokenService.findSessionOrCreate(
            argoSessionDto
        );
        const token: string = await JWTTokenService.generateToken(dtos);

        res.redirect(`${config.default.argoReact.BASE_ADDRESS}/callback/github?token=${token}`);
    }
);

/**
 * @export {express.Router}
 */
export default router;
