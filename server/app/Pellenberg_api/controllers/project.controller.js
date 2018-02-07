import { getAllProjects } from '../dataServices/project.service';
import { projectLoader } from '../dataLoaders/project';

/**
 * Get all projects
 * @param req
 * @param res
 * @returns void
 */
export function getProjects(req, res) {
  getAllProjects()
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

/**
 * Get a single project
 * @param req
 * @param res
 * @returns void
 */
export function getProject(req, res) {
  projectLoader.load(req.params.cuid)
  .then(item => {
    res.json({ item });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
