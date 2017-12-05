import {getItems} from './entity.search.controller';



export function getActivities(req, res) {
  req.params.collection = 'activities';
  return getItems(req, res);
}
