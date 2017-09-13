import { Router } from 'express';
import * as EntityController from '../controllers/entity.controller';
const router = new Router();

// Get all items
router.route('/:collection').get(EntityController.getItems);

// Get one item by cuid
router.route('/:collection/:cuid').get(EntityController.getItem);

//export default router;
module.exports = router;
