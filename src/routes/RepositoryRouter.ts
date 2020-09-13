import { Router } from 'express';
import { RepositoryComponent } from '../components';


const router: Router = Router();

router.post('/:organizationId', RepositoryComponent.create);

export default router;
