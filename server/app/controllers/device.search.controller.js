import Device from '../models/device';


/**
 * Get all devices from text search
 * @param req
 * @param res
 * @returns void
 */
export function getDevicesTextSearch(req, res) {
  let q = req.query.q;
  q = q.replace(/\+/g,' ');
  Device.find({
      $text: {$search: q}
    })
    .exec((err, devices) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ devices });
  });
}

export function getDevicesRegex(req, res) {
  let q = req.query.q;
  q = q.replace(/\+/g,' ');
  let pattern = new RegExp(q, 'i');//{'$regex': q, '$options': 'i'}
  Device.find({
      $or: [
        {'name': pattern},
        {'type': pattern},
      ]
    })
    .exec((err, devices) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ devices });
  });
}

export function getDevices(req, res) {
  let q = req.query.q;
  let q_regex = '(' + q.trim().replace(/\s+/g,'|') + ')';
  let pattern = new RegExp(q_regex, 'i');
  Device.find({
      $or: [
        {$text: {$search: q}},
        {'name': pattern},
        {'type': pattern},
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
