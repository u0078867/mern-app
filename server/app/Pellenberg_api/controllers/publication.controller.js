import { getAllPublications } from '../dataServices/publication.service';
import { publicationLoader } from '../dataLoaders/publication';

/**
 * Get all publications
 * @param req
 * @param res
 * @returns void
 */
export function getPublications(req, res) {
  getAllPublications()
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

/**
 * Get a single publication
 * @param req
 * @param res
 * @returns void
 */
export function getPublication(req, res) {
  publicationLoader.load(req.params.cuid)
  .then(item => {
    res.json({ item });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
