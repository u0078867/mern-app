import { Router } from 'express';
import * as ActivityController from '../controllers/activity.controller';
const router = new Router();

// Get all Activities
router.route('/activities').get(ActivityController.getActivities);

// Get one activity by cuid
router.route('/activities/:cuid').get(ActivityController.getActivity);

//export default router;
module.exports = router;
