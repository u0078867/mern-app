import { Router } from 'express';
import * as DeviceController from '../controllers/device.controller';
const router = new Router();

// Get all Devices
router.route('/devices').get(DeviceController.getDevices);

// Get one device by cuid
router.route('/devices/:cuid').get(DeviceController.getDevice);

//export default router;
module.exports = router;
