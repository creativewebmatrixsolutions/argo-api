import * as http from 'http';
import * as passport from 'passport';
import * as passportGithub from 'passport-github';
import config from '../env/index';
import HttpError from '../error';
import { NextFunction, Request, Response } from 'express';
import AuthService from '../../components/Auth/service';
import JWTTokenService from '../../components/Session/service';
import { IArgoSessionDto } from '../../components/Session/interface';
// tslint:disable-next-line: typedef
const passportGitlab = require('passport-gitlab2');

type GithubStrategyType = typeof passportGithub.Strategy;
type GitlabStrategyType = typeof passportGitlab.Strategy;

const GithubStrategy: GithubStrategyType = passportGithub.Strategy;
const GitlabStrategy: GitlabStrategyType = passportGitlab.Strategy;

/**
 * @description
 * determines, which data of the user object should be stored in the session.
 * The result of the serializeUser method is attached to the session 
 * as req.session.passport.user = {}
 */
passport.serializeUser((user: any, done: Function) => {
    done(undefined, user);
});

/**
 * @description
 * checks if user exists in database
 * if everything ok, proceed to route
 */
passport.deserializeUser(async (obj: any, done: Function) => {
    done(null, obj);
});

/**
 * @description
 * configuring new github strategy
 * and use it in passport
 */
passport.use(new GithubStrategy(
    {
        clientID: config.github.CLIENT_ID,
        clientSecret: config.github.CLIENT_SECRET,
        callbackURL: config.github.CALLBACK_URL,
        scope: "admin:org repo"
    },
    async (accessToken: any, refreshToken: any, profile: any, cb: any): Promise<void> => {
        // save profile here
        await AuthService.findProfileOrCreate({ profile: { ...profile._json, username: profile.username }, provider: { name: profile.provider } });
        return cb(null, { accessToken, refreshToken, profile });
    }
));

/**
 * @description
 * configuring new github strategy
 * and use it in passport
 */
passport.use(new GitlabStrategy(
    {
        clientID: config.gitlab.CLIENT_ID,
        clientSecret: config.gitlab.CLIENT_SECRET,
        callbackURL: config.gitlab.CALLBACK_URL
    },
    (accessToken: any, refreshToken: any, profile: any, cb: any): Promise<void> => {
        // save profile here
        // console.log(profile);
        AuthService.findProfileOrCreate({ profile: { ...profile._json, username: profile.username }, provider: { name: profile.provider } });

        return cb(null, { accessToken, refreshToken, profile });
    }
));

/**
 * @description Login Required middleware.
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    if (req.isAuthenticated()) {
        return next();
    }

    next(new HttpError(401, http.STATUS_CODES[401]));
}
