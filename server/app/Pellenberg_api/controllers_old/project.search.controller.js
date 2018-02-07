import {getItems} from './entity.search.controller';



export function getProjects(req, res) {
  req.params.collection = 'projects';
  return getItems(req, res);
}
