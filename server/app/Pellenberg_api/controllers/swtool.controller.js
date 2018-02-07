import { getAllSWTools } from '../dataServices/swtool.service';
import { softwareLoader } from '../dataLoaders/software';

/**
 * Get all software tools
 * @param req
 * @param res
 * @returns void
 */
export function getSWTools(req, res) {
  getAllSWTools()
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

/**
 * Get a single software tool
 * @param req
 * @param res
 * @returns void
 */
export function getSWTool(req, res) {
  softwareLoader.load(req.params.cuid)
  .then(item => {
    res.json({ item });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
