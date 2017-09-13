import { Router } from 'express';
import * as OutputController from '../controllers/output.controller';
const router = new Router();

if (process.env.NODE_ENV === 'development') {
  // Get all Outputs
  router.route('/outputs').get(OutputController.getOutputs);
}

// Get one output by cuid
router.route('/outputs/:cuid').get(OutputController.getOutput);

//export default router;
module.exports = router;
