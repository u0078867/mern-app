import { Router } from 'express';
import * as FormController from '../controllers/form.controller';
const router = new Router();

// Get all Forms
router.route('/forms').get(FormController.getForms);

// Get one form by cuid
router.route('/forms/:cuid').get(FormController.getForm);

// Add a new Form
router.route('/forms').post(FormController.addForm);

// Update form by cuid
router.route('/forms/:cuid').put(FormController.updateForm);

// Delete a form by cuid
router.route('/forms/:cuid').delete(FormController.deleteForm);

//export default router;
module.exports = router;
