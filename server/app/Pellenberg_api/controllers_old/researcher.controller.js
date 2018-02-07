import {getItems, getItem} from './entity.controller';


/**
 * Get all researchers
 * @param req
 * @param res
 * @returns void
 */
export function getResearchers(req, res) {
  req.params.collection = 'researchers';
  return getItems(req, res);
}

/**
 * Get a single researcher
 * @param req
 * @param res
 * @returns void
 */
export function getResearcher(req, res) {
  req.params.collection = 'researchers';
  return getItem(req, res);
}
