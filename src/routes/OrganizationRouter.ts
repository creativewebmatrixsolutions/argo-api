
import { Router } from 'express';

import { OrganizationComponent } from '../components';


const router: Router = Router();

router.post('/', OrganizationComponent.FindOrCreateOne);

router.get('/:id', OrganizationComponent.findOne);


export default router;