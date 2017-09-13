import { Router } from 'express';
import * as OutputController from '../controllers/output.search.controller';
const router = new Router();

// Get all Devices
router.route('/outputs').get(OutputController.getOutputs);

//export default router;
module.exports = router;
