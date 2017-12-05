import { Router } from 'express';
import * as PublicationController from '../controllers/publication.controller';
const router = new Router();

// Get all publications
router.route('/publications').get(PublicationController.getPublications);

// Get one publication by cuid
router.route('/publications/:cuid').get(PublicationController.getPublication);

//export default router;
module.exports = router;
