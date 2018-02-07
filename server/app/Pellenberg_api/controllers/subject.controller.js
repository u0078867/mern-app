import { getAllSubjects } from '../dataServices/subject.service';
import { subjectLoader } from '../dataLoaders/subject';

/**
 * Get all subjects
 * @param req
 * @param res
 * @returns void
 */
export function getSubjects(req, res) {
  getAllSubjects()
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

/**
 * Get a single subject
 * @param req
 * @param res
 * @returns void
 */
export function getSubject(req, res) {
  subjectLoader.load(req.params.cuid)
  .then(item => {
    res.json({ item });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
