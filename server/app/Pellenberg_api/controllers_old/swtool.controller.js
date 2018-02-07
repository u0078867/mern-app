import {getItems, getItem} from './entity.controller';

/**
 * Get all software tools
 * @param req
 * @param res
 * @returns void
 */
export function getSWTools(req, res) {
  req.params.collection = 'swtools';
  return getItems(req, res);
}

/**
 * Get a single software tool
 * @param req
 * @param res
 * @returns void
 */
export function getSWTool(req, res) {
  req.params.collection = 'swtools';
  return getItem(req, res);
}
