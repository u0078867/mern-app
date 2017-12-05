import {getItems} from './entity.search.controller';



export function getSubjects(req, res) {
  req.params.collection = 'subjects';
  return getItems(req, res);
}
