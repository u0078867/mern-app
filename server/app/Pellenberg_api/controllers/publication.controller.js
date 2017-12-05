import {getItems, getItem} from './entity.controller';

/**
 * Get all publications
 * @param req
 * @param res
 * @returns void
 */
export function getPublications(req, res) {
  req.params.collection = 'publications';
  return getItems(req, res);
}

/**
 * Get a single publication
 * @param req
 * @param res
 * @returns void
 */
export function getPublication(req, res) {
  req.params.collection = 'publications';
  return getItem(req, res);
}
