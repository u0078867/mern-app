import Subject from '../models/subject';



export function getSubjects(req, res) {
  let q = req.query.q;
  let q_regex = '(' + q.trim().replace(/\s+/g,'|') + ')';
  let pattern = new RegExp(q_regex, 'i');
  Subject.find({
      $or: [
        {$text: {$search: q}},
        /*{'name': pattern},
        {'surname': pattern},
        {'birthdate': pattern},*/
        {'attributes.value': pattern},
      ]
    }, { score: { $meta: "textScore" } } )
    .sort( { score: { $meta: "textScore" } } )
    .exec((err, subjects) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ subjects });
  })
}
