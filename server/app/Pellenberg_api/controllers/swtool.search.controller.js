import { getSWTools as searchSWTools } from '../dataServices/swtool.search.service';



export function getSWTools(req, res) {
  searchSWTools(req.query.q)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
