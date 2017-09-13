import {getItems} from './entity.search.controller';



export function getDevices(req, res) {
  req.params.collection = 'devices';
  return getItems(req, res);
}
