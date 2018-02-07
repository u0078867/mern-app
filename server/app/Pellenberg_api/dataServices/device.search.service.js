import {getItems} from './entity.search.service';



export function getDevices(q) {
  return getItems(q, 'devices');
}
