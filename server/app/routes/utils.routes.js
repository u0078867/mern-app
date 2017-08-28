import { Router } from 'express';
import * as UtilsController from '../controllers/utils.controller';
const router = new Router();

// Get all collections
router.route('/utils/staticize-json-schema').post(UtilsController.staticizeJSONSchema);

//export default router;
module.exports = router;
