import { getResearchers as searchResearchers } from '../dataServices/researcher.search.service';



export function getResearchers(req, res) {
  searchResearchers(req.query.q)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
