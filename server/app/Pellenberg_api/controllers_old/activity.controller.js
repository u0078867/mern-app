import {getItems, getItem} from './entity.controller';

/**
 * Get all activities
 * @param req
 * @param res
 * @returns void
 */
export function getActivities(req, res) {
  req.params.collection = 'activities';
  return getItems(req, res);
}

/**
 * Get a single activity
 * @param req
 * @param res
 * @returns void
 */
export function getActivity(req, res) {
  req.params.collection = 'activities';
  return getItem(req, res);
}
