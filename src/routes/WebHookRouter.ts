import { Router } from 'express';
import { WebHookComponent } from '../components';
import * as passportConfig from '../config/middleware/passport';

const router: Router = Router();

router.post('/create', passportConfig.isAuthenticated, WebHookComponent.createWebHook);
router.post('/notifyOnPush', WebHookComponent.pushNotify);

export default router;
