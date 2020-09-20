import { Router } from "express";
import { LogsComponent } from "../components";

const router: Router = Router();

router.post('/', LogsComponent.test);

export default router;