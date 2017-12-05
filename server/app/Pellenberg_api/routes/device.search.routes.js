import { Router } from 'express';
import * as DeviceController from '../controllers/device.search.controller';
const router = new Router();

// Get all Devices
router.route('/devices').get(DeviceController.getDevices);

//export default router;
module.exports = router;
