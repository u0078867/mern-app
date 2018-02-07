import { getDevices as searchDevices } from '../dataServices/device.search.service';



export function getDevices(req, res) {
  searchDevices(req.query.q)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
