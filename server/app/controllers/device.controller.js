import Device from '../models/device';


/**
 * Get all devices
 * @param req
 * @param res
 * @returns void
 */
export function getDevices(req, res) {
  Device.find().exec((err, devices) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ devices });
  });
}

/**
 * Get a single device
 * @param req
 * @param res
 * @returns void
 */
export function getDevice(req, res) {
  Device.findOne({ cuid: req.params.cuid }).exec((err, device) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ device });
  });
}
