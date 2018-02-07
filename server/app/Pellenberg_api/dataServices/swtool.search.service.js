import {getItems} from './entity.search.service';



export function getSWTools(q) {
  return getItems(q, 'swtools');
}
