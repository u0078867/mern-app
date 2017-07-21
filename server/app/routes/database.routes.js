import { Router } from 'express';
import * as DatabaseController from '../controllers/database.controller';
const router = new Router();

// Get all collections
router.route('/database/collections').get(DatabaseController.getCollections);

//export default router;
module.exports = router;
