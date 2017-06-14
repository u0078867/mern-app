import Subject from '../models/subject';


/**
 * Get all subjects from text search
 * @param req
 * @param res
 * @returns void
 */
export function getSubjectsTextSearch(req, res) {
  let q = req.query.q;
  q = q.replace(/\+/g,' ');
  Subject.find({
      $text: {$search: q}
    })
    .exec((err, subjects) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ subjects });
  });
}

export function getSubjectsRegex(req, res) {
  let q = req.query.q;
  q = q.replace(/\+/g,' ');
  let pattern = new RegExp(q, 'i');//{'$regex': q, '$options': 'i'}
  Subject.find({
      $or: [
        {'name': pattern},
        {'surname': pattern},
        {'birthdate': pattern},
      ]
    })
    .exec((err, subjects) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ subjects });
  });
}
