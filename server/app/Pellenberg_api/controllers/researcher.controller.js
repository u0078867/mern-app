import { getAllResearchers } from '../dataServices/researcher.service';
import { researcherLoader } from '../dataLoaders/researcher';


/**
 * Get all researchers
 * @param req
 * @param res
 * @returns void
 */
export function getResearchers(req, res) {
  getAllResearchers()
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

/**
 * Get a single researcher
 * @param req
 * @param res
 * @returns void
 */
export function getResearcher(req, res) {
  researcherLoader.load(req.params.cuid)
  .then(item => {
    res.json({ item });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
