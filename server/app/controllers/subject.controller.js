import Subject from '../models/subject';


/**
 * Get all subjects
 * @param req
 * @param res
 * @returns void
 */
export function getSubjects(req, res) {
  Subject.find().exec((err, subjects) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ subjects });
  });
}

/**
 * Get a single subject
 * @param req
 * @param res
 * @returns void
 */
export function getSubject(req, res) {
  Subject.findOne({ cuid: req.params.cuid }).exec((err, subject) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ subject });
  });
}
