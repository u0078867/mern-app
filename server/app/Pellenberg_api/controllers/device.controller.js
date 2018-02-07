import { getAllDevices } from '../dataServices/device.service';
import { deviceLoader } from '../dataLoaders/device';

/**
 * Get all devices
 * @param req
 * @param res
 * @returns void
 */
export function getDevices(req, res) {
  getAllDevices()
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

/**
 * Get a single device
 * @param req
 * @param res
 * @returns void
 */
export function getDevice(req, res) {
  deviceLoader.load(req.params.cuid)
  .then(item => {
    res.json({ item });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
