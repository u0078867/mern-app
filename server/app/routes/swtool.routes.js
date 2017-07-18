import { Router } from 'express';
import * as SWToolController from '../controllers/swtool.controller';
const router = new Router();

// Get all Software tools
router.route('/sw-tools').get(SWToolController.getSWTools);

// Get one software tool by cuid
router.route('/sw-tools/:cuid').get(SWToolController.getSWTool);

//export default router;
module.exports = router;
