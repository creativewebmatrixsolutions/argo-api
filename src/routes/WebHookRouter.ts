import { Router } from 'express';
import { WebHookComponent } from '../components';

const router: Router = Router();

router.post('/create', WebHookComponent.createWebHook);
router.post('/notifyOnPush', WebHookComponent.createWebHook);

export default router;
