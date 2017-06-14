import Subject from '../models/subject';


/**
 * Get all subjectss
 * @param req
 * @param res
 * @returns void
 */
export function getSubjects(req, res) {
  Subject.find().exec((err, subjects) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ subjects });
  });
}

/**
 * Get a single form
 * @param req
 * @param res
 * @returns void
 */
export function getSubject(req, res) {
  Subject.findOne({ cuid: req.params.cuid }).exec((err, subject) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ subject });
  });
}
