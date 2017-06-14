import { Router } from 'express';
import * as SubmController from '../controllers/subm.controller';
const router = new Router();

// Get all Submissions
router.route('/subms').get(SubmController.getSubms);

// Get one submission by cuid
router.route('/subms/:cuid').get(SubmController.getSubm);

// Add a new Submission
router.route('/subms').post(SubmController.addSubm);

// Update submission by cuid
router.route('/subms/:cuid').put(SubmController.updateSubm);

// Delete a submission by cuid
router.route('/subms/:cuid').delete(SubmController.deleteSubm);

//export default router;
module.exports = router;
