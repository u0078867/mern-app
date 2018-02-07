import {getItems} from './entity.search.service';



export function getResearchers(q) {
  return getItems(q, 'researchers');
}
