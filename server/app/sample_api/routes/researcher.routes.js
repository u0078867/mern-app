import { Router } from 'express';
import * as ResearcherController from '../controllers/researcher.controller';
const router = new Router();

// Get all Researchers
router.route('/researchers').get(ResearcherController.getResearchers);

// Get one researcher by cuid
router.route('/researchers/:cuid').get(ResearcherController.getResearcher);

//export default router;
module.exports = router;
