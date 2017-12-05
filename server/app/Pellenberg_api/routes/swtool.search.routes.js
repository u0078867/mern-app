import { Router } from 'express';
import * as SWToolController from '../controllers/swtool.search.controller';
const router = new Router();

// Get all Software tools
router.route('/swtools').get(SWToolController.getSWTools);

//export default router;
module.exports = router;
