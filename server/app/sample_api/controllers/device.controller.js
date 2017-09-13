import {getItems, getItem} from './entity.controller';

/**
 * Get all devices
 * @param req
 * @param res
 * @returns void
 */
export function getDevices(req, res) {
  req.params.collection = 'devices';
  return getItems(req, res);
}

/**
 * Get a single device
 * @param req
 * @param res
 * @returns void
 */
export function getDevice(req, res) {
  req.params.collection = 'devices';
  return getItem(req, res);
}
