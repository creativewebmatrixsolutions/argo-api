import { Router } from "express";
import { LogsComponent } from "../components";

const router: Router = Router();

router.post('/', LogsComponent.Deploy);

router.post('/:id', LogsComponent.FindDeploymentById);


export default router;

