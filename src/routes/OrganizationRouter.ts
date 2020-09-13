
import { Router } from 'express';

import { OrganizationComponent } from '../components';


const router: Router = Router();

router.get('/', OrganizationComponent.findAll);
router.get('/:id', OrganizationComponent.findOne);
router.post('/', OrganizationComponent.create);
router.delete('/:id', OrganizationComponent.remove);

export default router;
