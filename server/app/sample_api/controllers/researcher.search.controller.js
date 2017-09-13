import {getItems} from './entity.search.controller';



export function getResearchers(req, res) {
  req.params.collection = 'researchers';
  return getItems(req, res);
}
