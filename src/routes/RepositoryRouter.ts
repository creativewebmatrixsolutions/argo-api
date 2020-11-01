import { Router } from 'express';
import { RepositoryComponent } from '../components';


const router: Router = Router();

router.post('/', RepositoryComponent.create);

router.get('/github/repo', RepositoryComponent.GetUserRepos);

router.get('/:id', RepositoryComponent.findOne);
router.put('/:id', RepositoryComponent.findOneAndUpdate);

router.get('/installations/:installationId', RepositoryComponent.getInstallationRepos);

//router.get('/github/getcommits', RepositoryComponent.GetCommits);

export default router;
