import Researcher from '../models/researcher';



export function getResearchers(req, res) {
  let q = req.query.q;
  let q_regex = '(' + q.trim().replace(/\s+/g,'|') + ')';
  let pattern = new RegExp(q_regex, 'i');
  Researcher.find({
      $or: [
        {$text: {$search: q}},
        /*{'name': pattern},
        {'surname': pattern},
        {'birthdate': pattern},*/
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
