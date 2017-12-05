import {getItems, getItem} from './entity.controller';

/**
 * Get all projects
 * @param req
 * @param res
 * @returns void
 */
export function getProjects(req, res) {
  req.params.collection = 'projects';
  return getItems(req, res);
}

/**
 * Get a single project
 * @param req
 * @param res
 * @returns void
 */
export function getProject(req, res) {
  req.params.collection = 'projects';
  return getItem(req, res);
}
