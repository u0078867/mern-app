import { Router } from 'express';
import * as ResearcherController from '../controllers/researcher.search.controller';
const router = new Router();

// Get all Researchers
router.route('/researchers').get(ResearcherController.getResearchers);

//export default router;
module.exports = router;
