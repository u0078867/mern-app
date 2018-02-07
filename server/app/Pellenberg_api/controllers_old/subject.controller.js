import {getItems, getItem} from './entity.controller';

/**
 * Get all subjects
 * @param req
 * @param res
 * @returns void
 */
export function getSubjects(req, res) {
  req.params.collection = 'subjects';
  return getItems(req, res);
}

/**
 * Get a single subject
 * @param req
 * @param res
 * @returns void
 */
export function getSubject(req, res) {
  req.params.collection = 'subjects';
  return getItem(req, res);
}
