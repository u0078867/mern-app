import { Router } from 'express';
import * as PublicationController from '../controllers/publication.search.controller';
const router = new Router();

// Get all publications
router.route('/publications').get(PublicationController.getPublications);

//export default router;
module.exports = router;
