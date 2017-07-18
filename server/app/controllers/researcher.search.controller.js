import Researcher from '../models/researcher';


/**
 * Get all researchers from text search
 * @param req
 * @param res
 * @returns void
 */
export function getResearchersTextSearch(req, res) {
  let q = req.query.q;
  q = q.replace(/\+/g,' ');
  Researcher.find({
      $text: {$search: q}
    })
    .exec((err, researchers) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ researchers });
  });
}

export function getResearchersRegex(req, res) {
  let q = req.query.q;
  q = q.replace(/\+/g,' ');
  let pattern = new RegExp(q, 'i');//{'$regex': q, '$options': 'i'}
  Researcher.find({
      $or: [
        {'name': pattern},
        {'surname': pattern},
        {'birthdate': pattern},
      ]
    })
    .exec((err, researchers) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ researchers });
  });
}

export function getResearchers(req, res) {
  let q = req.query.q;
  let q_regex = '(' + q.trim().replace(/\s+/g,'|') + ')';
  let pattern = new RegExp(q_regex, 'i');
  Researcher.find({
      $or: [
        {$text: {$search: q}},
        {'name': pattern},
        {'surname': pattern},
        {'birthdate': pattern},
      ]
    }, { score: { $meta: "textScore" } } )
    .sort( { score: { $meta: "textScore" } } )
    .exec((err, researchers) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ researchers });
  })
}
