import { Router } from 'express';
import * as ProjectController from '../controllers/project.controller';
const router = new Router();

// Get all Projects
router.route('/projects').get(ProjectController.getProjects);

// Get one project by cuid
router.route('/projects/:cuid').get(ProjectController.getProject);

//export default router;
module.exports = router;
