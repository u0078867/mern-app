import {getItems} from './entity.search.controller';



export function getPublications(req, res) {
  req.params.collection = 'publications';
  return getItems(req, res);
}
