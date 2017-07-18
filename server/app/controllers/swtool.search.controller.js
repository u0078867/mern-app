import SWTool from '../models/swtool';


/**
 * Get all software tools from text search
 * @param req
 * @param res
 * @returns void
 */
export function getSWToolsTextSearch(req, res) {
  let q = req.query.q;
  q = q.replace(/\+/g,' ');
  SWTool.find({
      $text: {$search: q}
    },
      { score: { $meta: "textScore" } }
    )
    .sort( { score: { $meta: "textScore" } } )
    .exec((err, SWTools) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ SWTools });
  });
}

export function getSWToolsRegex(req, res) {
  let q = req.query.q;
  q = '(' + q.trim().replace(/\s+/g,'|') + ')';
  let pattern = new RegExp(q, 'i');//{'$regex': q, '$options': 'i'}
  SWTool.find({
      $or: [
        {'name': pattern},
        {'version': pattern},
        {'company': pattern},
      ]
    })
    .exec((err, SWTools) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ SWTools });
  });
}

export function getSWTools(req, res) {
  let q = req.query.q;
  let q_regex = '(' + q.trim().replace(/\s+/g,'|') + ')';
  let pattern = new RegExp(q_regex, 'i');
  SWTool.find({
      $or: [
        {$text: {$search: q}},
        {'name': pattern},
        {'version': pattern},
        {'company': pattern},
        {'download_uri': pattern},
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