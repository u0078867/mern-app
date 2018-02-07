import { getActivities as searchActivities } from '../dataServices/activity.search.service';



export function getActivities(req, res) {
  searchActivities(req.query.q)
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
