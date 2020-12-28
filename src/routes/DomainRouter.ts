const axios = require('axios');
import { Router } from "express";
import { Types } from "mongoose";
import GithubAppService from "../components/GitHubApp/service";
import RepositoryService from "../components/Repository/service";
import JWTTokenService from "../components/Session/service";

const router: Router = Router();

var request = require('request');

router.post('/', async (req: any, res: any) => {
    const argoDecodedHeaderToken: any = await JWTTokenService.DecodeToken(req);
    const deserializedToken: any = await JWTTokenService.VerifyToken(argoDecodedHeaderToken);
    let id = Types.ObjectId(deserializedToken.session_id);
    const getUserToken = await GithubAppService.findByUserId(id);
    if (getUserToken) {
        var sendRequest = await sendAddRequest(req);
        if (sendRequest) {
            RepositoryService.findOneAndUpdateDomain(req.body.repositoryId, req.body.domain, req.body.transactionId);
        }
    }
    res.status(200).json({
        success: true
    });
});

const sendAddRequest = async (req: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': 'https://dns.perma.online/v0/add_domain',
            'headers': {
                'Content-Type': 'text/plain'
            },
            body: req.body.domain
        };
        request(options, function (error: any, response: any) {
            if (error) throw new Error(error);
            resolve(response);
        });
    });

}

/**
 * @export {express.Router}
 */
export default router;