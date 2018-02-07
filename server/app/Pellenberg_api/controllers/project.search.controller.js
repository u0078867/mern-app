import { getProjects as searchProjects } from '../dataServices/project.search.service';



export function getProjects(req, res) {
  searchProjects(req.query.q)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
