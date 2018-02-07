import { Router } from 'express';
import * as MinioController from '../controllers/minio.controller';
const router = new Router();

// Get presigned put url
router.route('/minio/presigned-put-url').get(MinioController.getPresignedPutUrl);

// Get presigned get url
router.route('/minio/presigned-get-url').get(MinioController.getPresignedGetUrl);

// Get presigned get url
router.route('/minio/remove-object').get(MinioController.removeObject);

//export default router;
module.exports = router;
