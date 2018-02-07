import {getItems} from './entity.search.controller';



export function getSWTools(req, res) {
  req.params.collection = 'swtools';
  return getItems(req, res);
}
