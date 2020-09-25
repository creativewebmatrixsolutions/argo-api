import { Router } from 'express';
import { RepositoryComponent } from '../components';


const router: Router = Router();

router.post('/', RepositoryComponent.create);

router.get('/github/repo', RepositoryComponent.GetUserRepos);

router.get('/:id', RepositoryComponent.findOne);



export default router;
