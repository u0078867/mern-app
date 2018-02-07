import { getSubjects as searchSubjects } from '../dataServices/subject.search.service';



export function getSubjects(req, res) {
  searchSubjects(req.query.q)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
