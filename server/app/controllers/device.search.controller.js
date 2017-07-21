import Device from '../models/device';



export function getDevices(req, res) {
  let q = req.query.q;
  let q_regex = '(' + q.trim().replace(/\s+/g,'|') + ')';
  let pattern = new RegExp(q_regex, 'i');
  Device.find({
      $or: [
        {$text: {$search: q}},
        {'name': pattern},
        {'type': pattern},
        {'producer': pattern},
        {'uri': pattern},
      ]
    }, { score: { $meta: "textScore" } } )
    .sort( { score: { $meta: "textScore" } } )
    .exec((err, devices) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ devices });
  })
}
