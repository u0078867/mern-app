import { getOutputs as searchOutputs } from '../dataServices/output.search.service';



export function getOutputs(req, res) {
  searchOutputs(req.query.q)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
