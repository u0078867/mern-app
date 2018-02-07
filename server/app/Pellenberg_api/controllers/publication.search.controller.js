import { getPublications as searchPublications } from '../dataServices/publication.search.service';



export function getPublications(req, res) {
  searchPublications(req.query.q)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
