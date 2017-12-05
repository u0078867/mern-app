import { Router } from 'express';
import * as ActivityController from '../controllers/activity.search.controller';
const router = new Router();

// Get all Activities
router.route('/activities').get(ActivityController.getActivities);

//export default router;
module.exports = router;
