import SWTool from '../models/swtool';



export function getSWTools(req, res) {
  let q = req.query.q;
  let q_regex = '(' + q.trim().replace(/\s+/g,'|') + ')';
  let pattern = new RegExp(q_regex, 'i');
  SWTool.find({
      $or: [
        {$text: {$search: q}},
        {'name': pattern},
        {'version': pattern},
        {'producer': pattern},
        {'uri': pattern},
      ]
    }, { score: { $meta: "textScore" } } )
    .sort( { score: { $meta: "textScore" } } )
    .exec((err, SWTools) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ SWTools });
  });
}
