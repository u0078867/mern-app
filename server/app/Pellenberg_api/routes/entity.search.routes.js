import { Router } from 'express';
import * as EntityController from '../controllers/entity.search.controller';
const router = new Router();

// Get all items
router.route('/:collection').get(EntityController.getItems);

//export default router;
module.exports = router;
