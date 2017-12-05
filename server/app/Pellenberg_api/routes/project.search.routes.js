import { Router } from 'express';
import * as ProjectController from '../controllers/project.search.controller';
const router = new Router();

// Get all projects
router.route('/projects').get(ProjectController.getProjects);

//export default router;
module.exports = router;
