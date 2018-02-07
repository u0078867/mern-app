import { getAllActivities } from '../dataServices/activity.service';
import { activityLoader } from '../dataLoaders/activity';

/**
 * Get all activities
 * @param req
 * @param res
 * @returns void
 */
export function getActivities(req, res) {
  getAllActivities()
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

/**
 * Get a single activity
 * @param req
 * @param res
 * @returns void
 */
export function getActivity(req, res) {
  activityLoader.load(req.params.cuid)
  .then(item => {
    res.json({ item });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
