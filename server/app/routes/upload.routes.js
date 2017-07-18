import { Router } from 'express';
import * as UploadController from '../controllers/upload.controller';
const router = new Router();

// Upload file
router.route('/upload/file').post(UploadController.uploadFile);

// Upload data
router.route('/upload/data').post(UploadController.uploadData);

//export default router;
module.exports = router;
